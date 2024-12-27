package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.ProfileDTO;
import _inventory._inventory_api.domain.dto.UserUpdateDTO;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.domain.records.MessageHandler;
import _inventory._inventory_api.repositories.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            var userDB = this.getUserByToken(authHeader);
            if(userDB == null) throw new JWTVerificationException("Invalid Token");
            return ResponseEntity.ok(new ProfileDTO(userDB.getName(), userDB.getUsername(), userDB.getRole().getRole()));
        } catch (JWTVerificationException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Update user profile")
    @PutMapping("/update")
    public ResponseEntity<Object> updateProfile(@RequestHeader(value = "authorization") String authHeader, @RequestBody UserUpdateDTO userUpdateDTO){
        try {
            var newName = userUpdateDTO.newName();
            var userDB = this.getUserByToken(authHeader);
            if(userDB == null) throw new JWTVerificationException("Invalid Token");
            if(newName == null || newName.isBlank()) throw new UserException("Name must not be empty or null");
            userDB.setName(newName);
            repository.save(userDB);
            return ResponseEntity.accepted().build();
        } catch (UserException | JWTVerificationException e) {
            System.out.println(e.getMessage());
            var statusCode = HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(statusCode).body(new MessageHandler(statusCode.value(), e.getMessage()));
        }
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
