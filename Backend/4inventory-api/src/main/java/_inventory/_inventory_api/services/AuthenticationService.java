package _inventory._inventory_api.services;

import _inventory._inventory_api.config.security.TokenService;
import _inventory._inventory_api.domain.utils.UserValidator;
import _inventory._inventory_api.domain.dto.AuthenticationDTO;
import _inventory._inventory_api.domain.dto.ChangeRoleDTO;
import _inventory._inventory_api.domain.dto.RegisterDTO;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserValidator validator;

    public String login(AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        return tokenService.generateToken((User) auth.getPrincipal());
    }

    public void register(RegisterDTO data) {
        validator.validateUserRegister(data);
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        var newUser = new User(data.name(), data.login(), encryptedPassword, data.role());
        this.userRepository.save(newUser);
    }

    public void logout(String authHeader){
        var token = authHeader.split(" ")[1];
        tokenService.revokeToken(token);
    }

    public void changeUserRole(ChangeRoleDTO data){
        var userDB = this.userRepository.findByUsername(data.login());
        if (userDB == null)
            throw new UserException("Invalid Credentials, please try another user");
        userDB.setRole(data.role());
        userRepository.save(userDB);
    }

}
