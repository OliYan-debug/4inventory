package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.entities.Registry;
import _inventory._inventory_api.services.RegistryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registry")
public class RegistryController {

    @Autowired
    RegistryService registryService;

    @Operation(summary = "Get all registries")
    @GetMapping("/")
    public ResponseEntity<Page<Registry>> findAll(@RequestParam(value = "sort", defaultValue = "id,desc") String sort,
                                                  @RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size){
        return new ResponseEntity<>(registryService.findAll(page, size, sort), HttpStatus.OK);
    }

}
