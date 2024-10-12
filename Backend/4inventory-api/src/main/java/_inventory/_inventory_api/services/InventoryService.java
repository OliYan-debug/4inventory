package _inventory._inventory_api.services;

import _inventory._inventory_api.models.entities.InventoryItem;
import _inventory._inventory_api.models.entities.Registry;
import _inventory._inventory_api.models.enums.RegistryLabel;
import _inventory._inventory_api.models.exceptions.JustificationNotFoundException;
import _inventory._inventory_api.models.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.models.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.models.exceptions.items.InvalidQuantityException;
import _inventory._inventory_api.models.records.ItemAndCategory;
import _inventory._inventory_api.models.dto.ItemAndRegistryDTO;
import _inventory._inventory_api.models.records.ItemDelete;
import _inventory._inventory_api.repositories.InventoryRepository;
import _inventory._inventory_api.repositories.RegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepo;
    @Autowired
    InventoryCategoryService inventoryCategoryService;
    @Autowired
    RegistryRepository registryRepository;

    public List<InventoryItem> findAll() {
        return inventoryRepo.findAll();
    }
    public InventoryItem findById(Long itemId){
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemId);
        if(optionalItem.isPresent()) return optionalItem.get();
        throw new ItemIdNotFoundException(itemId);
    }
    public InventoryItem saveItem(InventoryItem item) {
        if (item.getItem() == null) throw new InvalidItemNameException("Name must not be empty");
        var inventoryItem = new InventoryItem();
        inventoryItem.setItem(item.getItem());
        inventoryItem.setDescription(item.getDescription() == null ? "" : item.getDescription());
        inventoryItem.setQuantity(item.getQuantity() == null ? 0 : item.getQuantity());
        inventoryItem.setCategory(item.getCategory() == null ? Set.of() : item.getCategory());
        var savedItem = inventoryRepo.save(inventoryItem);
        registryRepository.save(new Registry(savedItem.getId(), RegistryLabel.ADD, "Add a item"));
        return savedItem;
    }

    public String removeItem(ItemDelete item) {
        var itemId = item.id();
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemId);
        if (optionalItem.isPresent()) {
            if (item.justification() == null || item.justification().isEmpty()) throw new JustificationNotFoundException();
            registryRepository.save(new Registry(optionalItem.get().getId(), RegistryLabel.REMOVE, item.justification()));
            inventoryRepo.deleteById(itemId);
            return "Item " + itemId + " deleted";
        }
        throw new ItemIdNotFoundException(itemId);
    }

    public InventoryItem updateItem(InventoryItem itemUpdate) {
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemUpdate.getId());
        if (optionalItem.isPresent()) {
            var itemDB = optionalItem.get();
            var item = itemUpdate.getItem() == null ? itemDB.getItem() : itemUpdate.getItem();
            var description = itemUpdate.getDescription() == null ? itemDB.getDescription() : itemUpdate.getDescription();
            var quantity = itemUpdate.getQuantity() == null ? itemDB.getQuantity() : itemUpdate.getQuantity();
            itemDB.setItem(item);
            itemDB.setDescription(description);
            itemDB.setQuantity(quantity);
            return inventoryRepo.save(itemDB);
        }
        throw new ItemIdNotFoundException(itemUpdate.getId());
    }

    public InventoryItem updateItemQuantity(ItemAndRegistryDTO itemAndRegistryDTO) {
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemAndRegistryDTO.getId());
        if (optionalItem.isPresent()) {
            if (itemAndRegistryDTO.getQuantity() < 0)
                throw new InvalidQuantityException("Item quantity must be greater than 0");
            InventoryItem inventoryItem = optionalItem.get();
            var label = itemAndRegistryDTO.getQuantity() > inventoryItem.getQuantity() ? RegistryLabel.CHECK_IN : RegistryLabel.CHECK_OUT;
            inventoryItem.setQuantity(itemAndRegistryDTO.getQuantity());
            var itemSaved = inventoryRepo.save(inventoryItem);
            if(itemAndRegistryDTO.getJustification() == null || itemAndRegistryDTO.getJustification().isEmpty()) throw new JustificationNotFoundException();
            registryRepository.save(new Registry(itemSaved.getId(), label, itemAndRegistryDTO.getJustification()));
            return itemSaved;
        }
        throw new ItemIdNotFoundException(itemAndRegistryDTO.getId());
    }

    public InventoryItem addItemCategory(ItemAndCategory itemAndCategory) {
        return inventoryCategoryService.addCategory(itemAndCategory);
    }

    public InventoryItem removeItemCategory(ItemAndCategory itemAndCategory) {
        return inventoryCategoryService.removeCategory(itemAndCategory);
    }
}
