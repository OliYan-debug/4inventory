package _inventory._inventory_api.models.entities;

import _inventory._inventory_api.models.enums.RegistryLabel;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_registry")
public class Registry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long itemId;
    @Column(nullable = false)
    private RegistryLabel label;
    @Column(nullable = false)
    private String justification;
    private LocalDateTime created_at;

    public Registry(){}
    public Registry(Long itemId, RegistryLabel label, String justification) {
        this.itemId = itemId;
        this.label = label;
        this.justification = justification;
    }

    @PrePersist
    public void prePersist() {
        this.created_at = LocalDateTime.now();
    }
}
