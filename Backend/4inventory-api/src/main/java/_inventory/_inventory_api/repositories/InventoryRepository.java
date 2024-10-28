package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.InventoryItem;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends PagingAndSortingRepository<InventoryItem, Long> {
    List<InventoryItem> findByItemContainingIgnoreCase(String text);

    InventoryItem save(InventoryItem item);

    Optional<InventoryItem> findById(Long aLong);

    void deleteById(Long itemId);

    void deleteAll();
}
