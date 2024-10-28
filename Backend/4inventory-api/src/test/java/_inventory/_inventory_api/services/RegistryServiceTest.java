package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.dto.ItemAndRegistryDTO;
import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.domain.enums.RegistryLabel;
import _inventory._inventory_api.domain.records.ItemDelete;
import _inventory._inventory_api.repositories.InventoryRepository;
import _inventory._inventory_api.repositories.RegistryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class RegistryServiceTest {
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private InventoryRepository inventoryRe;

    @Autowired
    private RegistryRepository registryRepository;

    @Autowired
    private RegistryService registryService;

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
        inventoryRe.deleteAll();
        registryRepository.deleteAll();
    }

    @Test
    @DisplayName("Should add an item in the registry with label ADD")
    void registryCase1() {
        var registries = registryService.findAll(0, 10, "id,desc");
        var registry = registries.getContent();
        assertThat(registry).isNotNull();
        assertThat(registry.size()).isEqualTo(1);
        assertThat(registry.get(0).getLabel()).isEqualTo(RegistryLabel.ADD);
        assertThat(registry.get(0).getJustification()).isEqualTo("Add a item");
    }

    @Test
    @DisplayName("Should add an item in the registry with label REMOVE")
    void registryCase2() {
        inventoryService.removeItem(new ItemDelete(this.item.getId(), "I wanted it"));
        var registries = registryService.findAll(0, 10, "id,desc");
        var registry = registries.getContent();
        assertThat(registry).isNotNull();
        assertThat(registry.size()).isEqualTo(2);
        assertThat(registry.get(0).getLabel()).isEqualTo(RegistryLabel.REMOVE);
        assertThat(registry.get(0).getJustification()).isEqualTo("I wanted it");
    }

    @Test
    @DisplayName("Should add an item in the registry with label CHECK-IN")
    void registryCase3() {
        inventoryService.updateItemQuantity(new ItemAndRegistryDTO("New Items arrived", 100, this.item.getId()));
        var registries = registryService.findAll(0, 10, "id,desc");
        var registry = registries.getContent();
        assertThat(registry).isNotNull();
        assertThat(registry.size()).isEqualTo(2);
        assertThat(registry.get(0).getLabel()).isEqualTo(RegistryLabel.CHECK_IN);
        assertThat(registry.get(0).getJustification()).isEqualTo("New Items arrived");
    }

    @Test
    @DisplayName("Should add an item in the registry with label CHECK-OUT")
    void registryCase4() {
        inventoryService.updateItemQuantity(new ItemAndRegistryDTO("New Items left", 10, this.item.getId()));
        var registries = registryService.findAll(0, 10, "id,desc");
        var registry = registries.getContent();
        assertThat(registry).isNotNull();
        assertThat(registry.size()).isEqualTo(2);
        assertThat(registry.get(0).getLabel()).isEqualTo(RegistryLabel.CHECK_OUT);
        assertThat(registry.get(0).getJustification()).isEqualTo("New Items left");
    }

    @Test
    @DisplayName("Should add an item in the registry with label UPDATE")
    void registryCase5() {
        item.setDescription("Updated Description");
        item.setId(this.item.getId());
        inventoryService.updateItem(item);
        var registries = registryService.findAll(0, 10, "id,desc");
        var registry = registries.getContent();
        assertThat(registry).isNotNull();
        assertThat(registry.size()).isEqualTo(2);
        assertThat(registry.get(0).getLabel()).isEqualTo(RegistryLabel.UPDATE);
        assertThat(registry.get(0).getJustification()).isEqualTo("Update a item");
    }

}