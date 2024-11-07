package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.repositories.InventoryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class SearchServiceTest {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private SearchService searchService;

    private InventoryItem item;

    @BeforeEach
    public void setUp() {
        // Initialize an item and save it to the in-memory H2 database
        item = new InventoryItem();
        item.setItem("testItem");
        item.setDescription("testDescription");
        item.setQuantity(10);
        inventoryRepository.save(item);
    }
    @AfterEach
    public void cleanDB(){
        inventoryRepository.deleteAll();
    }
    @Test
    @DisplayName("Should return a list of inventory items with the given item name")
    void shouldReturnListOfInventoryItemsWithGivenItemName() {

        // Act
        var itemList = searchService.search("testItem");

        // Assert
        assertThat(itemList).isNotNull();
        assertThat(itemList.size()).isEqualTo(1);
        assertThat(itemList.get(0).getItem()).isEqualTo("testItem");
    }
    @Test
    @DisplayName("Should return a list of inventory items with the given partial item name")
    void shouldReturnListOfInventoryItemsWithGivenPartialItemName() {

        // Act
        var itemList = searchService.search("test");

        // Assert
        assertThat(itemList).isNotNull();
        assertThat(itemList.size()).isEqualTo(1);
        assertThat(itemList.get(0).getItem()).isEqualTo("testItem");
    }
    @Test
    @DisplayName("Should return a list of inventory items with the wrong given item name")
    void shouldNotReturnListOfInventoryItemsWithWrongGivenItemName() {
        // Act
        var itemList = searchService.search("testing");

        // Assert
        assertThat(itemList).isNotNull();
        assertThat(itemList.size()).isEqualTo(0);
    }
}