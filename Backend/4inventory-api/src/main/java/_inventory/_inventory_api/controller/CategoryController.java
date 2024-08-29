package _inventory._inventory_api.controller;

import _inventory._inventory_api.model.Category;
import _inventory._inventory_api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/")
    public List<Category> listAll(){
        return categoryRepository.findAll();
    }
    @PostMapping("/add")
    public Category add(@RequestBody Category category){
        return categoryRepository.save(category);
    }
}

