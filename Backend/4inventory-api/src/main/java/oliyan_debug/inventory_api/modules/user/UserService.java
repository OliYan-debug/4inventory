package oliyan_debug.inventory_api.modules.user;

import oliyan_debug.inventory_api.modules.auth.TokenService;
import oliyan_debug.inventory_api.modules.auth.exceptions.InvalidAuthException;
import oliyan_debug.inventory_api.modules.auth.utils.UserToken;
import oliyan_debug.inventory_api.modules.auth.utils.UserValidator;
import oliyan_debug.inventory_api.modules.user.dto.ProfileDTO;
import oliyan_debug.inventory_api.modules.user.dto.ResetPasswordDTO;
import oliyan_debug.inventory_api.modules.user.dto.UserUpdateDTO;
import oliyan_debug.inventory_api.modules.user.exceptions.UserException;

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
