package _inventory._inventory_api.repositories;

import _inventory._inventory_api.models.entities.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByItemContainingIgnoreCase(String text);
}
