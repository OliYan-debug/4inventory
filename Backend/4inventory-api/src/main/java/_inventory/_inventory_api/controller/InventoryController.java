package _inventory._inventory_api.controller;

import _inventory._inventory_api.model.InventoryItem;
import _inventory._inventory_api.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
public class InventoryController {
    @Autowired
    InventoryRepository inventoryRepo;

    @GetMapping("/")
    public ResponseEntity<List<InventoryItem>> listInventory(){
        return ResponseEntity.ok(inventoryRepo.findAll());
    }

    @PostMapping("/add")
    public void addItem(@RequestBody InventoryItem inventoryItem){
        inventoryRepo.save(inventoryItem);
    }
}
