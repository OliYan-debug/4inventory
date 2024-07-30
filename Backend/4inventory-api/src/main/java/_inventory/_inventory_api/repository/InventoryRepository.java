package _inventory._inventory_api.repository;

import _inventory._inventory_api.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, UUID> {
    
}
