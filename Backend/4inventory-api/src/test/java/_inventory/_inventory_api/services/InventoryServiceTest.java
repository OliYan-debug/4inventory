package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.dto.ItemAndRegistryDTO;
import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.domain.exceptions.JustificationNotFoundException;
import _inventory._inventory_api.domain.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.domain.exceptions.items.InvalidQuantityException;
import _inventory._inventory_api.domain.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.domain.records.ItemDelete;
import _inventory._inventory_api.repositories.InventoryRepository;
import _inventory._inventory_api.repositories.RegistryRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles("test")
class InventoryServiceTest {

    @Autowired
    InventoryService inventoryService;
    @Autowired
    InventoryRepository inventoryRepo;
    @Autowired
    InventoryCategoryService inventoryCategoryService;
    @Autowired
    RegistryRepository registryRepository;

    private InventoryItem item;

    @BeforeEach
    void setUp() {
        item = new InventoryItem();
        item.setItem("testItem");
        item.setDescription("testDescription");
        item.setQuantity(10);
        item = inventoryService.saveItem(item);
    }

    @AfterEach
    void cleanDB() {
        inventoryRepo.deleteAll();
        registryRepository.deleteAll();
    }

    @Test
    @DisplayName("Should find all items")
    void findAll() {
        var items = inventoryService.findAll(0, 10, "id,desc").getContent();
        assertThat(items).isNotNull();
        assertThat(items.size()).isEqualTo(1);
        assertThat(items.get(0).getItem()).isEqualTo("testItem");
    }

    @Test
    @DisplayName("Should find an item by the given ID")
    void findByIdCase1() {
        var itemID = item.getId();
        var itemFound = inventoryService.findById(itemID);
        assertThat(itemFound).isNotNull();
        assertThat(itemFound.getId()).isEqualTo(item.getId());
        assertThat(itemFound.getItem()).isEqualTo("testItem");
    }

    @Test
    @DisplayName("Should throw an exception when the item id is not found")
    void findByIdCase2() {
        var itemID = 1099L;
        var thrown = assertThrows(ItemIdNotFoundException.class, () -> inventoryService.findById(itemID));
        assertTrue(thrown.getMessage().contains("Item with id " + itemID + " not found!"));
    }

    @Test
    @DisplayName("Should save an item")
    void saveItemCase1() {
        var itemToBeSaved = new InventoryItem();
        itemToBeSaved.setItem("testItem2");
        itemToBeSaved.setDescription("testDescription2");
        itemToBeSaved.setQuantity(10);
        var itemSaved = inventoryService.saveItem(itemToBeSaved);
        assertThat(itemSaved).isNotNull();
        assertThat(itemSaved.getItem()).isEqualTo("testItem2");
        assertThat(itemSaved.getDescription()).isEqualTo("testDescription2");
        assertThat(itemSaved.getQuantity()).isEqualTo(10);
    }

    @Test
    @DisplayName("Should throw a exception when trying to save an item without name")
    void saveItemCase2() {
        var itemToBeSaved = new InventoryItem();
        itemToBeSaved.setDescription("testDescription2");
        itemToBeSaved.setQuantity(10);
        var thrown = assertThrows(InvalidItemNameException.class, () -> inventoryService.saveItem(itemToBeSaved));
        assertTrue(thrown.getMessage().contains("Name must not be empty"));
    }

    @Test
    @DisplayName("Should remove an item")
    void removeItemCase1() {
        var deleted = inventoryService.removeItem(new ItemDelete(this.item.getId(), "I wanted it"));
        assertTrue(deleted.contains("Item " + this.item.getId() + " deleted"));
    }

    @Test
    @DisplayName("Should throw an exception when trying to remove an item without justification or a empty justification")
    void removeItemCase2() {
        var thrown = assertThrows(JustificationNotFoundException.class, () -> inventoryService.removeItem(new ItemDelete(this.item.getId(), null)));
        assertTrue(thrown.getMessage().contains("Justification must not be empty"));
        var thrown2 = assertThrows(JustificationNotFoundException.class, () -> inventoryService.removeItem(new ItemDelete(this.item.getId(), "")));
        assertTrue(thrown2.getMessage().contains("Justification must not be empty"));
    }

    @Test
    @DisplayName("Should throw an exception when trying to remove an item with invalid id")
    void removeItemCase3() {
        var thrown = assertThrows(ItemIdNotFoundException.class, () -> inventoryService.removeItem(new ItemDelete(1001L, null)));
        assertTrue(thrown.getMessage().contains("Item with id " + 1001 + " not found!"));
    }

    @Test
    @DisplayName("Should update an item")
    void updateItemCase1() {
        item.setDescription("Updated Description");
        item.setQuantity(20);
        var itemUpdated = inventoryService.updateItem(item);
        assertThat(itemUpdated).isNotNull();
        assertThat(itemUpdated.getItem()).isEqualTo("testItem");
        assertThat(itemUpdated.getDescription()).isEqualTo("Updated Description");
        assertThat(itemUpdated.getQuantity()).isEqualTo(20);
    }

    @Test
    @DisplayName("Should throw an exception when trying to update an item with invalid id")
    void updateItemCase2() {
        item.setId(1001L);
        item.setDescription("Updated Description");
        item.setQuantity(20);
        var thrown = assertThrows(ItemIdNotFoundException.class, () -> inventoryService.updateItem(item));
        assertTrue(thrown.getMessage().contains("Item with id " + 1001 + " not found!"));
    }

    @Test
    @DisplayName("Should update an item quantity")
    void updateItemQuantityCase1() {
        inventoryService.updateItemQuantity(new ItemAndRegistryDTO("New Items left", 20, this.item.getId()));
        var itemFound = inventoryService.findById(this.item.getId());
        assertThat(itemFound).isNotNull();
        assertThat(itemFound.getItem()).isEqualTo("testItem");
        assertThat(itemFound.getQuantity()).isEqualTo(20);

    }

    @Test
    @DisplayName("Should throw an exception when trying to update an item quantity with negative quantity")
    void updateItemQuantityCase2() {
        var thrown = assertThrows(InvalidQuantityException.class, () -> inventoryService.updateItemQuantity(new ItemAndRegistryDTO("New Items left", -20, this.item.getId())));
        assertThat(thrown.getMessage()).contains("Item quantity must be greater than 0");
    }

    @Test
    @DisplayName("Should throw an exception when trying to update an item without justification or a empty justification")
    void updateItemQuantityCase3() {
        var thrown = assertThrows(JustificationNotFoundException.class, () -> inventoryService.updateItemQuantity(new ItemAndRegistryDTO("", 1, this.item.getId())));
        assertThat(thrown.getMessage()).contains("Justification must not be empty");
        var thrown2 = assertThrows(JustificationNotFoundException.class, () -> inventoryService.updateItemQuantity(new ItemAndRegistryDTO(null, 1, this.item.getId())));
        assertThat(thrown2.getMessage()).contains("Justification must not be empty");
    }

    @Test
    @DisplayName("Should throw an exception when trying to update an item quantity with invalid id")
    void updateItemQuantityCase4() {
        var thrown = assertThrows(ItemIdNotFoundException.class, () -> inventoryService.updateItemQuantity(new ItemAndRegistryDTO("New Items left", 10, 1001L)));
        assertThat(thrown.getMessage()).contains("Item with id " + 1001 + " not found!");
    }
}