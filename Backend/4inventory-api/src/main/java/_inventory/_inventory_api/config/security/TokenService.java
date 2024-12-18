package _inventory._inventory_api.config.security;

import _inventory._inventory_api.domain.entities.security.RevokedUserToken;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.exceptions.security.InvalidTokenException;
import _inventory._inventory_api.repositories.RevokedUserTokenRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;
    @Autowired
    RevokedUserTokenRepository repository;

    public String generateToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("4Inventory-api")
                    .withSubject(user.getUsername())
                    .withClaim("role", user.getRole().name())
                    .withExpiresAt(this.genExpirationDate())
                    .sign(algorithm);
            return token;
        }catch(JWTCreationException e){
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public String validateToken(String token){
        try{
            if(repository.findById(token).isPresent()) throw new InvalidTokenException();
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("4Inventory-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (InvalidTokenException | JWTVerificationException e) {
            return null;
        }
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }


    public void revokeToken(String token){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            var tokenToRevoke = JWT.require(algorithm)
                    .withIssuer("4Inventory-api")
                    .build()
                    .verify(token).getToken();
            var username = JWT.require(algorithm)
                    .withIssuer("4Inventory-api")
                    .build()
                    .verify(token).getSubject();
            repository.save(new RevokedUserToken(tokenToRevoke, username));
        } catch (JWTVerificationException e) {
            System.out.println(e);;
        }
    }
}
