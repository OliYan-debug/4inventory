package _inventory._inventory_api.controller;

import _inventory._inventory_api.model.InventoryItem;
import _inventory._inventory_api.repository.InventoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private InventoryRepository inventoryRepo;

    @GetMapping(value = "/{textToSearch}")
    @Operation(summary = "Search a item by name")
    public ResponseEntity<List<InventoryItem>> search(@PathVariable String textToSearch){
        return ResponseEntity.ok(inventoryRepo.findByItemContainingIgnoreCase(textToSearch));
    }
}
