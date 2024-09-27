package _inventory._inventory_api.controllers;

import _inventory._inventory_api.models.dto.InventoryItemDTO;
import _inventory._inventory_api.models.entities.InventoryItem;
import _inventory._inventory_api.models.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.models.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.models.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.models.exceptions.items.InvalidQuantityException;
import _inventory._inventory_api.models.records.ItemAndCategory;
import _inventory._inventory_api.models.records.ItemAndNewQuantity;
import _inventory._inventory_api.services.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    InventoryService inventoryService;


    @Operation(summary = "List all items in the inventory")
    @GetMapping("/")
    public ResponseEntity<List<InventoryItem>> listInventory() {
        return ResponseEntity.ok(inventoryService.findAll());
    }

    @Operation(summary = "Add a item in the inventory")
    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody InventoryItem inventoryItem) {
        try {
            return ResponseEntity.ok(inventoryService.saveItem(inventoryItem));
        } catch (InvalidItemNameException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Remove a item from the inventory")
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeItem(@RequestBody InventoryItem inventoryItem) {
        try {
            return ResponseEntity.accepted().body(inventoryService.removeItem(inventoryItem));
        } catch (ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update a item from the inventory")
    @PutMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody InventoryItem itemUpdate) {
        try {
            return ResponseEntity.accepted().body(inventoryService.updateItem(itemUpdate));
        } catch (ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @Operation(summary = "Update the quantity of a item")
    @PutMapping("/update/quantity")
    public ResponseEntity<?> updateItemQuantity(@RequestBody ItemAndNewQuantity itemAndNewQuantity) {
        try {
            return ResponseEntity.accepted().body(inventoryService.updateItemQuantity(itemAndNewQuantity));
        } catch (ItemIdNotFoundException | InvalidQuantityException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @Operation(summary = "Add a category to a item")
    @PostMapping("/add/category")
    public ResponseEntity<?> addCategory(@RequestBody ItemAndCategory categoryRequest) {
        try {
            return ResponseEntity.accepted().body(inventoryService.addItemCategory(categoryRequest));
        } catch (CategoryIdNotFoundException | ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Remove a category from a item")
    @DeleteMapping("/remove/category")
    public ResponseEntity<?> removeCategory(@RequestBody ItemAndCategory categoryRequest) {
        try {
            return ResponseEntity.accepted().body(inventoryService.removeItemCategory(categoryRequest));
        } catch (CategoryIdNotFoundException | ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
