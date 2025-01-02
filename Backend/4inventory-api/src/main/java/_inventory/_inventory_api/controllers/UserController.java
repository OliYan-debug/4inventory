package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.ResetPasswordDTO;
import _inventory._inventory_api.domain.dto.UserUpdateDTO;
import _inventory._inventory_api.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Operation(summary = "User password reset")
    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestHeader(value = "authorization") String authHeader, @RequestBody @Valid ResetPasswordDTO data) {
        userService.resetPassword(authHeader, data);
        return ResponseEntity.ok().build();
    }
}
