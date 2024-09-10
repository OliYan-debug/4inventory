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
    public List<Category> listAll(){
        return categoryRepository.findAll();
    }
    @Operation(summary = "Add a category")
    @PostMapping("/add")
    public Category add(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    @Operation(summary = "Update a category")
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Category categoryUpdate){
        Optional<Category> optionalItem = categoryRepository.findById(categoryUpdate.getId());
        if(optionalItem.isPresent()){
            return ResponseEntity.ok(categoryRepository.save(categoryUpdate));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category id "+categoryUpdate.getId()+" not found");
    }
}

