package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.UserDTO;
import _inventory._inventory_api.repositories.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Value("${api.security.token.secret}")
    private String secret;

    @Autowired
    private UserRepository repository;

    @Operation(summary = "View user profile information")
    @GetMapping("/profile")
    public ResponseEntity<Object> viewProfile(@RequestHeader(value = "authorization") String authHeader) {
        try {
            var token = authHeader.split(" ")[1];
            Algorithm algorithm = Algorithm.HMAC256(secret);
            var username = JWT.require(algorithm)
                    .withIssuer("4Inventory-api")
                    .build()
                    .verify(token).getSubject();
            var userDB = repository.findByUsername(username);
            return ResponseEntity.ok(new UserDTO(userDB.getName(), username, userDB.getRole().getRole()));
        } catch (JWTVerificationException e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
