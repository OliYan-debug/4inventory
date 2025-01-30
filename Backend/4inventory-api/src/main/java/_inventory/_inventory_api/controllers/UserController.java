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

    @Operation(summary = "View user information")
    @GetMapping("")
    public ResponseEntity<Object> viewProfile(@RequestHeader(value = "authorization") String authHeader) {
        return ResponseEntity.ok(userService.getProfile(authHeader));
    }

    @Operation(summary = "Update user information")
    @PutMapping("")
    public ResponseEntity<Object> updateProfile(@RequestHeader(value = "authorization") String authHeader, @RequestBody UserUpdateDTO userUpdateDTO) {
            userService.updateProfile(authHeader, userUpdateDTO);
            return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Password reset")
    @PostMapping("/password")
    public ResponseEntity<Object> resetPassword(@RequestHeader(value = "authorization") String authHeader, @RequestBody @Valid ResetPasswordDTO data) {
        userService.resetPassword(authHeader, data);
        return ResponseEntity.ok().build();
    }
}
