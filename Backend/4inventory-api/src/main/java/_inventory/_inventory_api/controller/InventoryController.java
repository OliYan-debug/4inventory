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
    public ResponseEntity<String> removeItem(Long itemId){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemId);
        if(optionalItem.isPresent()){
            inventoryRepo.deleteById(itemId);
           return ResponseEntity.ok("Item "+itemId+" deleted");
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Update a item from the inventory")
    @PutMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody InventoryItem itemUpdate){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemUpdate.getId());
        if(optionalItem.isPresent()){
            var itemDB = optionalItem.get();
            var item = itemUpdate.getItem() == null ? itemDB.getItem() : itemUpdate.getItem();
            var description = itemUpdate.getDescription() == null ? itemDB.getDescription() : itemUpdate.getDescription();
            var quantity = itemUpdate.getQuantity() == null ? itemDB.getQuantity() : itemUpdate.getQuantity();
            itemDB.setItem(item);
            itemDB.setDescription(description);
            itemDB.setQuantity(quantity);
            return ResponseEntity.accepted().body(inventoryRepo.save(itemDB));
        }
        return ResponseEntity.badRequest().body("The item with id "+itemUpdate.getId()+" not found");
    }



    public record itemAndNewQuantity(Long id, Integer quantity) { }
    @Operation(summary = "Update the quantity of a item")
    @PutMapping("/update/quantity")
    public ResponseEntity<String> updateItemQuantity(@RequestBody itemAndNewQuantity itemAndNewQuantity){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemAndNewQuantity.id());
        if(optionalItem.isPresent()){
            if(itemAndNewQuantity.quantity < 0) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quantity must be greater than 0");
            InventoryItem inventoryItem = optionalItem.get();
            inventoryItem.setQuantity(itemAndNewQuantity.quantity());
            inventoryRepo.save(inventoryItem);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item with ID "+itemAndNewQuantity.id()+" not found");
    }



    public record itemAndCategory(Long itemId, Long categoryId) { }
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
