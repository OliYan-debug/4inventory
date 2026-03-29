package oliyan_debug.inventory_api.modules.search;

import oliyan_debug.inventory_api.domain.entities.InventoryItem;
import oliyan_debug.inventory_api.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {
    @Autowired
    private InventoryRepository inventoryRepo;

    public List<InventoryItem> search(String textToSearch){
        return inventoryRepo.findByItemContainingIgnoreCase(textToSearch);
    }
}
