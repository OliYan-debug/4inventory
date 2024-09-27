package _inventory._inventory_api.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "tb_inventory")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String item;
    private String description;
    private Integer quantity;
    private LocalDate created_at;
    private LocalDateTime last_update;
    @ManyToMany()
    private Set<Category> category;

    @PrePersist
    public void prePersist() {
        this.created_at = LocalDate.now();
        this.last_update = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.last_update = LocalDateTime.now();
    }

}
