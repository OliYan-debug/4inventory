package _inventory._inventory_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Table(name = "tb_inventory")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String item;
    private String description;
    private Integer quantity;
    private LocalDate created_at;
    private LocalDateTime last_update;
    @OneToMany()
    private Set<Category> category;
    @PrePersist
    public void prePersist(){
        this.created_at = LocalDate.now();
        this.last_update = LocalDateTime.now();
    }
    @PreUpdate
    public void preUpdate(){
        this.last_update = LocalDateTime.now();
    }

}
