package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.entities.Category;
import _inventory._inventory_api.domain.exceptions.categories.CategoryAlreadyExistsException;
import _inventory._inventory_api.domain.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.domain.exceptions.categories.InvalidCategoryException;
import _inventory._inventory_api.domain.records.MessageHandler;
import _inventory._inventory_api.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "List all categories")
    @GetMapping()
    public ResponseEntity<List<Category>> listAll() {
        return ResponseEntity.status(200).body(categoryService.findAll());
    }

    @Operation(summary = "Add a category")
    @PostMapping()
    public ResponseEntity<?> add(@RequestBody Category category) {
        try {
            return ResponseEntity.status(200).body(categoryService.saveCategory(category));
        } catch (CategoryAlreadyExistsException | InvalidCategoryException e) {
            return ResponseEntity.badRequest().body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update a category")
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Category categoryUpdate) {
        try {
            return ResponseEntity.ok(categoryService.updateCategory(categoryUpdate));
        } catch (CategoryIdNotFoundException | CategoryAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }

    }

    @Operation(summary = "Delete a category")
    @DeleteMapping()
    public ResponseEntity<?> remove(@RequestBody Category categoryToDelete) {
        try {
            return ResponseEntity.accepted().body(new MessageHandler(HttpStatus.ACCEPTED.value(), categoryService.deleteCategory(categoryToDelete)));
        } catch (CategoryIdNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageHandler(HttpStatus.BAD_REQUEST.value(), "Category still been used in some items and you cannot delete it until remove from all of them"));
        }
    }
}

