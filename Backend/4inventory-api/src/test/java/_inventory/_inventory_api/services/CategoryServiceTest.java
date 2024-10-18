package _inventory._inventory_api.services;

import _inventory._inventory_api.models.entities.Category;
import _inventory._inventory_api.models.exceptions.categories.CategoryAlreadyExistsException;
import _inventory._inventory_api.models.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.models.exceptions.categories.InvalidCategoryException;
import _inventory._inventory_api.repositories.CategoryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertThrows;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
@ActiveProfiles("test")
class CategoryServiceTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setName("printer");
        category.setColor("red");
        categoryRepository.save(category);
    }

    @AfterEach
    void cleanDB() {
        categoryRepository.deleteAll();
    }


    @Test
    @DisplayName("Retrieve all categories in the database.")
    void findAll() {
        var categoryReceived = new Category();
        categoryReceived.setName("computer");
        categoryReceived.setColor("green");
        categoryRepository.save(categoryReceived);
        assertThat(categoryService.findAll()).isNotNull();
        assertThat(categoryService.findAll().size()).isEqualTo(2);
    }

    @Test
    @DisplayName("Retrieve a category by the given name")
    void findByNameCase1() {
        assertThat(categoryService.findByName("printer").get(0).getName()).isEqualTo("printer");
    }

    @Test
    @DisplayName("Not retrieve a category by the given wrong name")
    void findByNameCase2() {
        assertThat(categoryService.findByName("tesla")).isNotNull();
        assertThat(categoryService.findByName("tesla").size()).isEqualTo(0);
    }

    @Test
    @DisplayName("Retrieve a category by the given ID")
    void findByIdCase1() {
        assertThat(categoryService.findById(this.category.getId())).isNotNull();
        assertThat(categoryService.findById(this.category.getId())).isEqualTo(this.category);
    }

    @Test
    @DisplayName("Category with wrong id throws exception")
    void findByIdCase2() {
        CategoryIdNotFoundException thrown = assertThrows(CategoryIdNotFoundException.class, () -> categoryService.findById(2L));
        assertTrue(thrown.getMessage().contains("Category with id " + 2 + " not found!"));
    }

    @Test
    @DisplayName("Save a category")
    void saveCategoryCase1() {
        var categoryReceived = new Category();
        categoryReceived.setName("computer");
        categoryReceived.setColor("red");
        assertThat(categoryService.saveCategory(categoryReceived)).isEqualTo(categoryReceived);
    }

    @Test
    @DisplayName("Save a category with null variables throws exception")
    void saveCategoryCase2() {
        var categoryReceived = new Category();
        categoryReceived.setName(null);
        categoryReceived.setColor("red");
        var categoryReceived2 = new Category();
        categoryReceived2.setName("computer");
        categoryReceived2.setColor(null);
        InvalidCategoryException thrown = assertThrows(InvalidCategoryException.class, () -> categoryService.saveCategory(categoryReceived));
        assertTrue(thrown.getMessage().contains("Category must have a name and a color"));
        InvalidCategoryException thrown2 = assertThrows(InvalidCategoryException.class, () -> categoryService.saveCategory(categoryReceived2));
        assertTrue(thrown2.getMessage().contains("Category must have a name and a color"));
    }

    @Test
    @DisplayName("Save a category with same name of other in the db throws exception")
    void saveCategoryCase3() {
        var categoryReceived = new Category();
        categoryReceived.setName("printer");
        categoryReceived.setColor("red");
        CategoryAlreadyExistsException thrown = assertThrows(CategoryAlreadyExistsException.class, () -> categoryService.saveCategory(categoryReceived));
        assertTrue(thrown.getMessage().contains("Category with name " + categoryReceived.getName() + " already exists"));
    }

    @Test
    @DisplayName("Update a category")
    void updateCategoryCase1() {
        var categoryUpdate = new Category();
        categoryUpdate.setId(category.getId());
        categoryUpdate.setName("OKI");
        categoryUpdate.setColor("green");
        var categorySaved = categoryService.updateCategory(categoryUpdate);
        assertThat(categorySaved).isNotNull();
        assertThat(categorySaved).isEqualTo(categoryUpdate);
    }

    @Test
    @DisplayName("Update a category with invalid id throws exception")
    void updateCategoryCase2() {
        var categoryUpdate = new Category();
        categoryUpdate.setId(100);
        categoryUpdate.setName("OKI");
        categoryUpdate.setColor("green");
        var thrown = assertThrows(CategoryIdNotFoundException.class, () -> categoryService.updateCategory(categoryUpdate));
        assertTrue(thrown.getMessage().contains("Category with id " + 100 + " not found!"));
    }
    @Test
    @DisplayName("Update a category with same name and other color")
    void updateCategoryCase3() {
        category.setColor("green");
        assertThat(categoryService.updateCategory(category)).isEqualTo(category);
    }
    @Test
    @DisplayName("Update a category with same name of other in the db throws exception")
    void updateCategoryCase4() {
        var categoryUpdate = new Category();
        categoryUpdate.setName("OKI");
        categoryUpdate.setColor("green");
        categoryService.saveCategory(categoryUpdate);
        category.setName("OKI");
        var thrown = assertThrows(CategoryAlreadyExistsException.class, () -> categoryService.updateCategory(category));
        assertTrue(thrown.getMessage().contains("Category with name " + categoryUpdate.getName() + " already exists"));
    }

    @Test
    @DisplayName("Delete one category from db")
    void deleteCategoryCase1() {
        assertThat(categoryService.deleteCategory(category)).isEqualTo("Deleted item with id " + category.getId() + " successfully");
        assertThat(categoryService.findAll().size()).isEqualTo(0);
    }

    @Test
    @DisplayName("Delete a category with te wrong id throws exception")
    void deleteCategoryCase2() {
        var categoryToDelete = new Category();
        categoryToDelete.setId(100);
        var thrown = assertThrows(CategoryIdNotFoundException.class, () -> categoryService.deleteCategory(categoryToDelete));
        assertTrue(thrown.getMessage().contains("Category with id " + 100 + " not found!"));
    }
}