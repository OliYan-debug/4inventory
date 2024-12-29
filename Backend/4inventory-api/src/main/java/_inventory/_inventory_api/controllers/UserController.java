package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.UserUpdateDTO;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.domain.records.MessageHandler;
import _inventory._inventory_api.repositories.UserRepository;
import _inventory._inventory_api.services.UserService;
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

    @Autowired
    private UserService userService;

    @Operation(summary = "View user profile information")
    @GetMapping("/profile")
    public ResponseEntity<Object> viewProfile(@RequestHeader(value = "authorization") String authHeader) {
        return ResponseEntity.ok(userService.getProfile(authHeader));
    }

    @Operation(summary = "Update user profile")
    @PutMapping("/update")
    public ResponseEntity<Object> updateProfile(@RequestHeader(value = "authorization") String authHeader, @RequestBody UserUpdateDTO userUpdateDTO) {
            userService.updateProfile(authHeader, userUpdateDTO);
            return ResponseEntity.accepted().build();
    }

}
