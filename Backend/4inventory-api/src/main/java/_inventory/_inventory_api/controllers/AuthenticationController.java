package _inventory._inventory_api.controllers;

import _inventory._inventory_api.config.security.TokenService;
import _inventory._inventory_api.domain.dto.AuthenticationDTO;
import _inventory._inventory_api.domain.dto.LoginResponseDTO;
import _inventory._inventory_api.domain.dto.RegisterDTO;
import _inventory._inventory_api.domain.dto.ResetPasswordDTO;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    @Operation(summary = "User login")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @Operation(summary = "User password reset")
    @PostMapping("/reset")
    public ResponseEntity<Object> resetPassword(@RequestHeader(value = "authorization") String authHeader, @RequestBody @Valid ResetPasswordDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        if(data.newPassword() == null) return ResponseEntity.badRequest().build();
        var encryptedPassword = new BCryptPasswordEncoder().encode(data.newPassword());
        var user = userRepository.findByUsername(data.login());
        user.setPassword(encryptedPassword);
        userRepository.save(user);
        var token = authHeader.split(" ")[1];
        tokenService.revokeToken(token);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "User register")
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO data){
        if(this.userRepository.findByUsername(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        var newUser = new User(data.login(), encryptedPassword, data.role());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Logout user ('Set a token as invalid')")
    @PostMapping("/logout")
    public ResponseEntity<Object> logout(@RequestHeader(value = "authorization") String authHeader){
        var token = authHeader.split(" ")[1];
        tokenService.revokeToken(token);
        return ResponseEntity.ok().build();
    }
}
