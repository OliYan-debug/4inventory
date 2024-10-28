package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.entities.Category;
import _inventory._inventory_api.domain.exceptions.categories.CategoryAlreadyExistsException;
import _inventory._inventory_api.domain.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.domain.exceptions.categories.InvalidCategoryException;
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

    public List<Category> findByName(String text) {
        return categoryRepository.findByNameIgnoreCase(text);
    }

    public Category findById(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            return categoryOptional.get();
        }
        throw new CategoryIdNotFoundException(id);
    }

    public Category saveCategory(Category category) {
        var categoryDB = findByName(category.getName());
        if (category.getName() == null || category.getColor() == null) {
            throw new InvalidCategoryException("Category must have a name and a color");
        }
        if (categoryDB.isEmpty()) return categoryRepository.save(category);
        throw new CategoryAlreadyExistsException(category.getName());
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
            if (othersCategory.isEmpty() || othersCategory.get(0).getId() == categoryDB.getId())
                return categoryRepository.save(categoryDB);
            throw new CategoryAlreadyExistsException(name);
        }
        throw new CategoryIdNotFoundException(categoryUpdate.getId());

    }

    public String deleteCategory(Category category) {
        Optional<Category> optionalItem = categoryRepository.findById(category.getId());
        if (optionalItem.isPresent()) {
            categoryRepository.deleteById(category.getId());
            return "Deleted item with id " + category.getId() + " successfully";
        }
        throw new CategoryIdNotFoundException(category.getId());
    }
}
