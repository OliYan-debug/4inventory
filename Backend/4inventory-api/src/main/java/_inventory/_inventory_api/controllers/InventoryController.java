package _inventory._inventory_api.controllers;

import _inventory._inventory_api.models.entities.InventoryItem;
import _inventory._inventory_api.models.exceptions.JustificationNotFoundException;
import _inventory._inventory_api.models.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.models.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.models.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.models.exceptions.items.InvalidQuantityException;
import _inventory._inventory_api.models.records.ItemAndCategory;
import _inventory._inventory_api.models.dto.ItemAndRegistryDTO;
import _inventory._inventory_api.models.records.ItemDelete;
import _inventory._inventory_api.models.records.MessageHandler;
import _inventory._inventory_api.services.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Remove a item from the inventory")
    @DeleteMapping("/remove")
    public ResponseEntity<?> removeItem(@RequestBody ItemDelete inventoryItem) {
        try {
            return ResponseEntity.accepted().body(new MessageHandler(HttpStatus.ACCEPTED.value(), inventoryService.removeItem(inventoryItem)));
        } catch (ItemIdNotFoundException | JustificationNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update a item from the inventory")
    @PutMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody InventoryItem itemUpdate) {
        try {
            return ResponseEntity.accepted().body(inventoryService.updateItem(itemUpdate));
        } catch (ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }
    @GetMapping(value = "/item/{id}")
    @Operation(summary = "Find a item by id")
    public ResponseEntity<?> findItemById(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(inventoryService.findById(id));
        }catch(ItemIdNotFoundException e){
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update the quantity of a item")
    @PutMapping("/update/quantity")
    public ResponseEntity<?> updateItemQuantity(@RequestBody ItemAndRegistryDTO itemAndRegistryDTO) {
        try {
            return ResponseEntity.accepted().body(inventoryService.updateItemQuantity(itemAndRegistryDTO));
        } catch (ItemIdNotFoundException | InvalidQuantityException | JustificationNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Add a category to a item")
    @PostMapping("/add/category")
    public ResponseEntity<?> addCategory(@RequestBody ItemAndCategory categoryRequest) {
        try {
            return ResponseEntity.accepted().body(inventoryService.addItemCategory(categoryRequest));
        } catch (CategoryIdNotFoundException | ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Remove a category from a item")
    @DeleteMapping("/remove/category")
    public ResponseEntity<?> removeCategory(@RequestBody ItemAndCategory categoryRequest) {
        try {
            return ResponseEntity.accepted().body(inventoryService.removeItemCategory(categoryRequest));
        } catch (CategoryIdNotFoundException | ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

}
