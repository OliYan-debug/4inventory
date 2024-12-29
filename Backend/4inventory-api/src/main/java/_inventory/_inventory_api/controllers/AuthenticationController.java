package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.*;
import _inventory._inventory_api.domain.utils.ResponseErrorHandler;
import _inventory._inventory_api.services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ResponseErrorHandler responseErrorHandler;

    @Operation(summary = "User login")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            return ResponseEntity.ok(new LoginResponseDTO(authenticationService.login(data)));
        } catch (AuthenticationException e) {
            return responseErrorHandler.generate(HttpStatus.BAD_REQUEST, "User or password invalid");
        }
    }

    @Operation(summary = "User password reset")
    @PostMapping("/reset")
    public ResponseEntity<Object> resetPassword(@RequestHeader(value = "authorization") String authHeader, @RequestBody @Valid ResetPasswordDTO data) {
        authenticationService.resetPassword(authHeader, data);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "User register")
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO data) {
        authenticationService.register(data);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Logout user ('Set a token as invalid')")
    @PostMapping("/logout")
    public ResponseEntity<Object> logout(@RequestHeader(value = "authorization") String authHeader) {
        authenticationService.logout(authHeader);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Change the user role")
    @PostMapping("/change-role")
    public ResponseEntity<Object> changeRole(@RequestBody ChangeRoleDTO data) {
        authenticationService.changeUserRole(data);
        return ResponseEntity.ok().build();
    }
}
