package _inventory._inventory_api.controllers;

import _inventory._inventory_api.models.entities.Registry;
import _inventory._inventory_api.repositories.RegistryRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/registry")
public class RegistryController {

    @Autowired
    RegistryRepository registryRepository;

    @Operation(summary = "Get all registries")
    @GetMapping("/")
    public ResponseEntity<List<Registry>> findAll(){
        return new ResponseEntity<>(registryRepository.findAll(), HttpStatus.OK);
    }

}
