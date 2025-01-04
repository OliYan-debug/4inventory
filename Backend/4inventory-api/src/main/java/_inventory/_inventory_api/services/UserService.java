package _inventory._inventory_api.services;

import _inventory._inventory_api.config.security.TokenService;
import _inventory._inventory_api.domain.dto.ProfileDTO;
import _inventory._inventory_api.domain.dto.ResetPasswordDTO;
import _inventory._inventory_api.domain.dto.UserUpdateDTO;
import _inventory._inventory_api.domain.exceptions.security.InvalidAuthException;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.domain.utils.UserToken;
import _inventory._inventory_api.domain.utils.UserValidator;
import _inventory._inventory_api.repositories.UserRepository;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private UserToken userToken;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserValidator validator;

    public ProfileDTO getProfile(String authHeader){
        var userDB = userToken.getUserByToken(authHeader);
        if(userDB == null) throw new JWTVerificationException("Invalid Token");
        return new ProfileDTO(userDB.getName(), userDB.getUsername(), userDB.getRole().getRole());
    }

    public void updateProfile(String authHeader, UserUpdateDTO userUpdateDTO){
        var newName = userUpdateDTO.newName();
        var userDB = userToken.getUserByToken(authHeader);
        if (userDB == null) throw new JWTVerificationException("Invalid Token");
        if (newName == null || newName.isBlank()) throw new UserException("Name must not be empty or null");
        if (newName.equals(userDB.getName())) throw new UserException("New name is equal to current name. Try another");
        userDB.setName(newName);
        repository.save(userDB);
    }
    public void resetPassword(String authHeader, ResetPasswordDTO data) {
        var authUser = userToken.getUserByToken(authHeader);
        if(!authUser.getUsername().equals(data.login())) throw new UserException("You cannot change other user password");
        var user = repository.findByUsername(data.login());
        if(!new BCryptPasswordEncoder().matches(data.password(), user.getPassword())) throw new InvalidAuthException("Login or password incorrect");
        if(new BCryptPasswordEncoder().matches(data.newPassword(), user.getPassword())) throw new UserException("New password cannot be equal to current password");
        validator.validateUserPassword(data.newPassword());
        var encryptedPassword = new BCryptPasswordEncoder().encode(data.newPassword());
        user.setPassword(encryptedPassword);
        repository.save(user);
        tokenService.revokeToken(userToken.getTokenByHeader(authHeader));
    }
}
