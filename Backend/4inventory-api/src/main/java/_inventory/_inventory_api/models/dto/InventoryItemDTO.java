package _inventory._inventory_api.models.dto;

import _inventory._inventory_api.models.entities.Category;
import lombok.Data;

import java.util.Set;

@Data
public class InventoryItemDTO {
    private String item;
    private String description;
    private Integer quantity;
    private Set<Category> category;
}
