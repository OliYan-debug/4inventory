package oliyan_debug.inventory_api.modules.search;

import oliyan_debug.inventory_api.modules.inventory.InventoryItem;
import oliyan_debug.inventory_api.modules.inventory.InventoryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
class SearchServiceTest {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private SearchService searchService;

    private InventoryItem item;

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:17");
  
    @BeforeEach
    public void setUp() {
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

        var itemList = searchService.search("testItem");

        assertThat(itemList).isNotNull();
        assertThat(itemList.size()).isEqualTo(1);
        assertThat(itemList.get(0).getItem()).isEqualTo("testItem");
    }
    @Test
    @DisplayName("Should return a list of inventory items with the given partial item name")
    void shouldReturnListOfInventoryItemsWithGivenPartialItemName() {

        var itemList = searchService.search("test");

        assertThat(itemList).isNotNull();
        assertThat(itemList.size()).isEqualTo(1);
        assertThat(itemList.get(0).getItem()).isEqualTo("testItem");
    }
    @Test
    @DisplayName("Should return a list of inventory items with the wrong given item name")
    void shouldNotReturnListOfInventoryItemsWithWrongGivenItemName() {
        var itemList = searchService.search("testing");

        assertThat(itemList).isNotNull();
        assertThat(itemList.size()).isEqualTo(0);
    }
}