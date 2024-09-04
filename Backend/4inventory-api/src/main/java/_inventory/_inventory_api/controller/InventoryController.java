package _inventory._inventory_api.controller;

import _inventory._inventory_api.model.Category;
import _inventory._inventory_api.model.InventoryItem;
import _inventory._inventory_api.repository.CategoryRepository;
import _inventory._inventory_api.repository.InventoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController()
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    InventoryRepository inventoryRepo;

    @Autowired
    CategoryRepository categoryRepo;
    @Operation(summary = "List all items in the inventory")
    @GetMapping("/")
    public ResponseEntity<List<InventoryItem>> listInventory(){
        return ResponseEntity.ok(inventoryRepo.findAll());
    }

    @Operation(summary = "Add a item in the inventory")
    @PostMapping("/add")
    public ResponseEntity<InventoryItem> addItem(@RequestBody InventoryItem inventoryItem){
        return ResponseEntity.ok(inventoryRepo.save(inventoryItem));
    }
    @Operation(summary = "Remove a item from the inventory")
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeItem(UUID itemId){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemId);
        if(optionalItem.isPresent()){
            inventoryRepo.deleteById(itemId);
           return ResponseEntity.ok("Item "+itemId+" deleted");
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    public record itemAndCategory(UUID itemId, Long categoryId) { }

    @Operation(summary = "Add a category to a item")
    @PostMapping("/add/category")
    public ResponseEntity<InventoryItem> addCategory(@RequestBody itemAndCategory categoryRequest){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(categoryRequest.itemId());
        if(optionalItem.isPresent()){
            InventoryItem item = optionalItem.get();
            Optional<Category> category = categoryRepo.findById(categoryRequest.categoryId());
            category.ifPresent(value -> item.getCategory().add(value));
            inventoryRepo.save(item);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Remove a category from a item")
    @DeleteMapping("/remove/category")
    public ResponseEntity<InventoryItem> removeCategory(@RequestBody itemAndCategory categoryRequest){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(categoryRequest.itemId());
        if(optionalItem.isPresent()){
            InventoryItem item = optionalItem.get();
            Optional<Category> category = categoryRepo.findById(categoryRequest.categoryId());
            category.ifPresent(value -> item.getCategory().remove(value));
            inventoryRepo.save(item);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
