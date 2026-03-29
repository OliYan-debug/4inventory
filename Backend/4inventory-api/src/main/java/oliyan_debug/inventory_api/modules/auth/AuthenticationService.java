package oliyan_debug.inventory_api.modules.auth;

import oliyan_debug.inventory_api.modules.auth.dto.AuthenticationDTO;
import oliyan_debug.inventory_api.modules.user.User;
import oliyan_debug.inventory_api.modules.user.UserRepository;
import oliyan_debug.inventory_api.modules.user.dto.RegisterDTO;

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


}
