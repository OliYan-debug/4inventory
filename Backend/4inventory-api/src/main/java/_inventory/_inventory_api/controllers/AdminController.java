package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.ChangeRoleDTO;
import _inventory._inventory_api.domain.dto.ResetPasswordAdminDTO;
import _inventory._inventory_api.domain.dto.UserDTO;
import _inventory._inventory_api.services.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @Operation(summary = "View admin profile information")
    @GetMapping("/profile")
    public ResponseEntity<Object> viewProfile(@RequestHeader(value = "authorization") String authHeader) {
        return ResponseEntity.ok(adminService.getProfile(authHeader));
    }

    @Operation(summary = "View all app users")
    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getUsers(@RequestParam(value = "sort", defaultValue = "id,desc") String sort,
                                               @RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getUsers(page, size, sort));
    }
    @Operation(summary = "Delete a user")
    @DeleteMapping("/users")
    public ResponseEntity<Object> deleteUser(@RequestBody @Valid ResetPasswordAdminDTO data){
        adminService.deleteUser(data);
        return ResponseEntity.ok().build();
    }
    @Operation(summary = "Users password reset")
    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestBody @Valid ResetPasswordAdminDTO data) {
        adminService.resetPassword(data);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Change the user role")
    @PostMapping("/change-role")
    public ResponseEntity<Object> changeRole(@RequestBody ChangeRoleDTO data) {
        adminService.changeUserRole(data);
        return ResponseEntity.ok().build();
    }
}
