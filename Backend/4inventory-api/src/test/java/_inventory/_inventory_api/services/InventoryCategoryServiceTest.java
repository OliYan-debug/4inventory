package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.entities.Category;
import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.domain.exceptions.categories.CategoryIdNotFoundException;
import _inventory._inventory_api.domain.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.domain.records.ItemAndCategory;
import _inventory._inventory_api.repositories.CategoryRepository;
import _inventory._inventory_api.repositories.InventoryRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@ActiveProfiles("test")
class InventoryCategoryServiceTest {

    @Autowired
    CategoryRepository categoryRepo;
    @Autowired
    InventoryRepository inventoryRepo;
    @Autowired
    InventoryCategoryService inventoryCategoryService;
    @Autowired
    InventoryService inventoryService;
    private InventoryItem item;
    private Category category;

    @BeforeEach
    void setUp() {
        item = new InventoryItem();
        item.setItem("testItem");
        item.setDescription("testDescription");
        item.setQuantity(10);
        item = inventoryRepo.save(item);
        category = new Category();
        category.setName("testCategory");
        category.setColor("red");
        category = categoryRepo.save(category);
    }

    @AfterEach
    void cleanDB() {
        inventoryRepo.deleteAll();
        categoryRepo.deleteAll();
    }

    @Test
    @DisplayName("Should add a category to a item")
    void addCategoryCase1() {
        assertThat(inventoryCategoryService.addCategory(new ItemAndCategory(item.getId(), category.getId())).getCategory().contains(category)).isTrue();
    }

    @Test
    @DisplayName("Should throw an exception when trying to add a category to an item with invalid id")
    void addCategoryCase2() {
        var thrown = assertThrows(ItemIdNotFoundException.class, () -> inventoryCategoryService.addCategory(new ItemAndCategory(1001L, category.getId())));
        assertThat(thrown.getMessage()).contains("Item with id " + 1001L + " not found!");
    }

    @Test
    @DisplayName("Should throw an exception when trying to add a category invalid id")
    void addCategoryCase3() {
        var thrown = assertThrows(CategoryIdNotFoundException.class, () -> inventoryCategoryService.addCategory(new ItemAndCategory(item.getId(), 1001L)));
        assertThat(thrown.getMessage()).contains("Category with id " + 1001L + " not found!");
    }

    @Test
    @DisplayName("Should remove a category from a item")
    void removeCategoryCase1() {
        assertThat(inventoryCategoryService.removeCategory(new ItemAndCategory(item.getId(), category.getId())).getCategory().isEmpty()).isTrue();
    }

    @Test
    @DisplayName("Should throw an exception when trying to remove a category to an item with invalid id")
    void removeCategoryCase2() {
        var thrown = assertThrows(ItemIdNotFoundException.class, () -> inventoryCategoryService.removeCategory(new ItemAndCategory(1001L, category.getId())));
        assertThat(thrown.getMessage()).contains("Item with id " + 1001L + " not found!");
    }

    @Test
    @DisplayName("Should throw an exception when trying to remove a category with invalid id")
    void removeCategoryCase3() {
        var thrown = assertThrows(CategoryIdNotFoundException.class, () -> inventoryCategoryService.removeCategory(new ItemAndCategory(item.getId(), 1001L)));
        assertThat(thrown.getMessage()).contains("Category with id " + 1001L + " not found!");
    }
}