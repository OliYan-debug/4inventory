package _inventory._inventory_api.domain.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "tb_inventory")
@NoArgsConstructor
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String item;
    private String description;
    private Integer quantity;
    private LocalDate createdAt;
    private LocalDateTime lastUpdate;
    @ManyToMany()
    private Set<Category> category;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDate.now();
        this.lastUpdate = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.lastUpdate = LocalDateTime.now();
    }

}
