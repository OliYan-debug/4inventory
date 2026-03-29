package oliyan_debug.inventory_api.modules.inventory;

import oliyan_debug.inventory_api.modules.category.Category;
import oliyan_debug.inventory_api.modules.category.CategoryRepository;
import oliyan_debug.inventory_api.modules.category.exceptions.CategoryIdNotFoundException;
import oliyan_debug.inventory_api.modules.inventory.exceptions.ItemIdNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryCategoryService {
    @Autowired
    CategoryRepository categoryRepo;
    @Autowired
    InventoryRepository inventoryRepo;

    @Transactional
    public InventoryItem addCategory(ItemAndCategory categoryRequest) {
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(categoryRequest.itemId());
        if (optionalItem.isPresent()) {
            InventoryItem item = optionalItem.get();
            Optional<Category> category = categoryRepo.findById(categoryRequest.categoryId());
            category.ifPresentOrElse(value -> item.getCategory().add(value), () -> {
                throw new CategoryIdNotFoundException(categoryRequest.categoryId());
            });
            return inventoryRepo.save(item);
        } else {
            throw new ItemIdNotFoundException(categoryRequest.itemId());
        }
    }
    @Transactional
    public InventoryItem removeCategory(ItemAndCategory categoryRequest) {
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(categoryRequest.itemId());
        if (optionalItem.isPresent()) {
            Optional<Category> category = categoryRepo.findById(categoryRequest.categoryId());
            InventoryItem item = optionalItem.get();
            category.ifPresentOrElse(value -> item.getCategory().remove(value), () -> {
                throw new CategoryIdNotFoundException(categoryRequest.categoryId());
            });
            return inventoryRepo.save(item);
        } else {
            throw new ItemIdNotFoundException(categoryRequest.itemId());
        }
    }

}
