package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.entities.Registry;
import _inventory._inventory_api.services.RegistryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registry")
public class RegistryController {

    @Autowired
    RegistryService registryService;

    @Operation(summary = "Get all registries")
    @GetMapping()
    public ResponseEntity<Page<Registry>> findAll(@RequestParam(value = "sort", defaultValue = "id,desc") String sort,
                                                  @RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size){
        return new ResponseEntity<>(registryService.findAll(page, size, sort), HttpStatus.OK);
    }

    @Operation(summary = "Get registries by item")
    @GetMapping("/filter")
    public ResponseEntity<List<Registry>> getById(@RequestParam(value = "itemId") Integer itemId, @RequestParam(value = "label", defaultValue = "null") String label){
        return new ResponseEntity<>(registryService.filterById(itemId, label), HttpStatus.OK);
    }
}
