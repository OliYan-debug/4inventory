package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.dto.ChangeRoleDTO;
import _inventory._inventory_api.domain.dto.UserDTO;
import _inventory._inventory_api.services.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @Operation(summary = "View admin information")
    @GetMapping("")
    public ResponseEntity<Object> viewProfile(@RequestHeader(value = "authorization") String authHeader) {
        return ResponseEntity.ok(adminService.getProfile(authHeader));
    }

    @Operation(summary = "View all users")
    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getUsers(@RequestParam(value = "sort", defaultValue = "id,desc") String sort,
                                               @RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getUsers(page, size, sort));
    }
    @Operation(summary = "Delete a user")
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable("userId") String id){
        adminService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
    @Operation(summary = "Users password reset")
    @PostMapping("/users/{userId}/password")
    public ResponseEntity<Object> resetPassword(@PathVariable("userId") String id) {
        adminService.resetPassword(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Change the user role")
    @PatchMapping("/users/{userId}/role")
    public ResponseEntity<Object> changeRole(@RequestBody ChangeRoleDTO data, @PathVariable("userId") String id) {
        adminService.changeUserRole(id, data);
        return ResponseEntity.ok().build();
    }
}
