package _inventory._inventory_api.domain.utils;

import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.repositories.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class UserToken {
    @Value("${api.security.token.secret}")
    private String secret;

    @Autowired
    private UserRepository repository;

    public User getUserByToken(String authHeader){
        var token = this.getTokenByHeader(authHeader);
        Algorithm algorithm = Algorithm.HMAC256(secret);
        var username = JWT.require(algorithm)
                .withIssuer("4Inventory-api")
                .build()
                .verify(token).getSubject();
        var userDB = repository.findByUsername(username);
        if (userDB.getUsername() == null) return null;
        return userDB;
    }
    public String getTokenByHeader(String authHeader){
        return authHeader.split(" ")[1];
    }
}
