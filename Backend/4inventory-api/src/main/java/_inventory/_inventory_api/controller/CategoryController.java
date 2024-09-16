package _inventory._inventory_api.controller;

import _inventory._inventory_api.model.Category;
import _inventory._inventory_api.repository.CategoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Operation(summary = "List all categories")
    @GetMapping("/")
    public ResponseEntity<List<Category>> listAll(){
        return ResponseEntity.status(200).body(categoryRepository.findAll());
    }
    @Operation(summary = "Add a category")
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Category category){
        if(category.getName() == null || category.getColor() == null){
            return ResponseEntity.badRequest().body("Category must have a name and a color");
        }
        return ResponseEntity.status(200).body(categoryRepository.save(category));
    }

    @Operation(summary = "Update a category")
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Category categoryUpdate){
        Optional<Category> optionalItem = categoryRepository.findById(categoryUpdate.getId());
        if(optionalItem.isPresent()){
            var categoryDB = optionalItem.get();
            var name = categoryUpdate.getName() == null ? categoryDB.getName() : categoryUpdate.getName();
            var color = categoryUpdate.getColor() == null ? categoryDB.getColor() : categoryUpdate.getColor();
            categoryDB.setName(name);
            categoryDB.setColor(color);
            return ResponseEntity.ok(categoryRepository.save(categoryDB));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category id "+categoryUpdate.getId()+" not found");
    }
    @Operation(summary = "Delete a category")
    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestBody Category categoryDelete){
        Optional<Category> optionalItem = categoryRepository.findById(categoryDelete.getId());
        if(optionalItem.isPresent()){
            categoryRepository.deleteById(categoryDelete.getId());
            return ResponseEntity.accepted().body("Deleted item with id "+ categoryDelete.getId() +" successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category id "+categoryDelete.getId()+" not found");
    }
}

