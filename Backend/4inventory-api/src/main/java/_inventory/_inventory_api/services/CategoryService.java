package _inventory._inventory_api.services;

import _inventory._inventory_api.models.entities.Category;
import _inventory._inventory_api.models.exceptions.categories.CategoryAlreadyExistsException;
import _inventory._inventory_api.models.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.models.exceptions.categories.InvalidCategoryException;
import _inventory._inventory_api.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findByName(String text) {
        return categoryRepository.findByNameIgnoreCase(text);
    }

    public Category saveCategory(Category category) {
        var categoryDB = categoryRepository.findByNameIgnoreCase(category.getName());
        if (categoryDB != null)
            throw new CategoryAlreadyExistsException(category.getName());
        if (category.getName() == null || category.getColor() == null) {
            throw new InvalidCategoryException("Category must have a name and a color");
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category categoryUpdate) {
        Optional<Category> optionalItem = categoryRepository.findById(categoryUpdate.getId());
        if (optionalItem.isPresent()) {
            var categoryDB = optionalItem.get();
            var name = categoryUpdate.getName() == null ? categoryDB.getName() : categoryUpdate.getName();
            var color = categoryUpdate.getColor() == null ? categoryDB.getColor() : categoryUpdate.getColor();
            categoryDB.setName(name);
            categoryDB.setColor(color);
            var othersCategory = categoryRepository.findByNameIgnoreCase(name);
            if (othersCategory != null && othersCategory.getId() != categoryUpdate.getId())
                throw new CategoryAlreadyExistsException(name);
            return categoryRepository.save(categoryDB);
        } else {
            throw new CategoryIdNotFoundException(categoryUpdate.getId());
        }
    }

    public String deleteCategory(Category category) {
        Optional<Category> optionalItem = categoryRepository.findById(category.getId());
        if (optionalItem.isPresent()) {
            categoryRepository.deleteById(category.getId());
            return "Deleted item with id " + category.getId() + " successfully";
        } else {
            throw new CategoryIdNotFoundException(category.getId());
        }
    }
}
