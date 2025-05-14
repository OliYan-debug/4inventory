package _inventory._inventory_api.controllers;

import _inventory._inventory_api.repositories.CategoryRepository;
import _inventory._inventory_api.repositories.InventoryRepository;
import _inventory._inventory_api.repositories.RegistryRepository;
import _inventory._inventory_api.repositories.UserRepository;
import _inventory._inventory_api.services.BackupService;
import _inventory._inventory_api.services.CategoryService;
import _inventory._inventory_api.services.InventoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;

@RestController
@Slf4j
@RequestMapping("/backup")
public class BackupController {

    private final BackupService backupService;

    BackupController(BackupService backupService, InventoryService inventoryService, ObjectMapper jacksonObjectMapper, InventoryRepository inventoryRepository, CategoryRepository categoryRepository, CategoryService categoryService, UserRepository userRepository, RegistryRepository registryRepository, ObjectMapper objectMapper) {
        this.backupService = backupService;
    }

    @GetMapping()
    public ResponseEntity<?> backupToJson() throws JsonProcessingException {
        var buffer = backupService.backupInventoryToJson();
        return ResponseEntity
                .ok()
                .contentLength(buffer.length)
                .header("Content-Disposition", String.format("attachment; filename=\"4inBackup-%s.json\"", backupService.generateTimestamp()))
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(new ByteArrayInputStream(buffer)));
    }

    @PostMapping()
    public ResponseEntity<?> loadBackup(@RequestBody Map<String, Object> backup) throws IOException {
        backupService.loadBackup(backup);
        return ResponseEntity.ok("Uploaded!");
    }


}
