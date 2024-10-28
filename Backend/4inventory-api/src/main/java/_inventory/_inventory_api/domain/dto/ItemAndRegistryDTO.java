package _inventory._inventory_api.domain.dto;

import lombok.Data;

@Data
public class ItemAndRegistryDTO {
    private Long id;
    private Integer quantity;
    private String justification;

    public ItemAndRegistryDTO(String justification, Integer quantity, Long id) {
        this.justification = justification;
        this.quantity = quantity;
        this.id = id;
    }
}