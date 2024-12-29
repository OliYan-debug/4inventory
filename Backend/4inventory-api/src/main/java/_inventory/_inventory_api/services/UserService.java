package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.dto.ProfileDTO;
import _inventory._inventory_api.domain.dto.UserUpdateDTO;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.repositories.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Value("${api.security.token.secret}")
    private String secret;

    @Autowired
    private UserRepository repository;


    public ProfileDTO getProfile(String authHeader){
        var userDB = this.getUserByToken(authHeader);
        if(userDB == null) throw new JWTVerificationException("Invalid Token");
        return new ProfileDTO(userDB.getName(), userDB.getUsername(), userDB.getRole().getRole());
    }

    public void updateProfile(String authHeader, UserUpdateDTO userUpdateDTO){
        var newName = userUpdateDTO.newName();
        var userDB = this.getUserByToken(authHeader);
        if (userDB == null) throw new JWTVerificationException("Invalid Token");
        if (newName == null || newName.isBlank()) throw new UserException("Name must not be empty or null");
        userDB.setName(newName);
        repository.save(userDB);
    }


    private User getUserByToken(String authHeader){
        var token = authHeader.split(" ")[1];
        Algorithm algorithm = Algorithm.HMAC256(secret);
        var username = JWT.require(algorithm)
                .withIssuer("4Inventory-api")
                .build()
                .verify(token).getSubject();
        var userDB = repository.findByUsername(username);
        if (userDB.getUsername() == null) return null;
        return userDB;
    }
}
