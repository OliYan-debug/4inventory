package _inventory._inventory_api.repository;

import _inventory._inventory_api.model.InventoryItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InventoryRepositoryTest {

    @Mock
    InventoryRepository inventoryRepository;

    InventoryItem item;

    @BeforeEach
    public void setup(){
        item = new InventoryItem();
        item.setItem("Impressora");
        item.setDescription("HP 408dn");
        item.setQuantity(12);
    }

    @Test
    void mustFindItemByNameIgnoringCase(){
        when(inventoryRepository.findByItemContainingIgnoreCase("Impressora")).thenReturn(Collections.singletonList(item));
        var items = inventoryRepository.findByItemContainingIgnoreCase("Impressora");
        assertEquals(Collections.singletonList(item), items);
    }
}