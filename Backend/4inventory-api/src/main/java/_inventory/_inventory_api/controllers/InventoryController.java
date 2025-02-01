package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.domain.exceptions.JustificationNotFoundException;
import _inventory._inventory_api.domain.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.domain.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.domain.exceptions.items.InvalidQuantityException;
import _inventory._inventory_api.domain.dto.ItemAndRegistryDTO;
import _inventory._inventory_api.domain.records.ItemDelete;
import _inventory._inventory_api.domain.records.MessageHandler;
import _inventory._inventory_api.services.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    InventoryService inventoryService;


    @Operation(summary = "List all items in the inventory")
    @GetMapping()
    public ResponseEntity<Page<InventoryItem>> listInventory(@RequestParam(value = "sort", defaultValue = "id,desc") String sort,
                                                             @RequestParam(value = "page", defaultValue = "0") int page,
                                                             @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(inventoryService.findAll(page, size, sort));
    }

    @Operation(summary = "Add a item in the inventory")
    @PostMapping()
    public ResponseEntity<?> addItem(@RequestBody InventoryItem inventoryItem) {
        try {
            return ResponseEntity.ok(inventoryService.saveItem(inventoryItem));
        } catch (InvalidItemNameException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Remove a item from the inventory")
    @DeleteMapping()
    public ResponseEntity<?> removeItem(@RequestBody ItemDelete inventoryItem) {
        try {
            return ResponseEntity.accepted().body(new MessageHandler(HttpStatus.ACCEPTED.value(), inventoryService.removeItem(inventoryItem)));
        } catch (ItemIdNotFoundException | JustificationNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update a item from the inventory")
    @PutMapping()
    public ResponseEntity<?> updateItem(@RequestBody InventoryItem itemUpdate) {
        try {
            return ResponseEntity.accepted().body(inventoryService.updateItem(itemUpdate));
        } catch (ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "Find a item by id")
    public ResponseEntity<?> findItemById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(inventoryService.findById(id));
        } catch (ItemIdNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update the quantity of a item")
    @PatchMapping()
    public ResponseEntity<?> updateItemQuantity(@RequestBody ItemAndRegistryDTO itemAndRegistryDTO) {
        try {
            return ResponseEntity.accepted().body(inventoryService.updateItemQuantity(itemAndRegistryDTO));
        } catch (ItemIdNotFoundException | InvalidQuantityException | JustificationNotFoundException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

}
