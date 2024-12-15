package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.domain.entities.Registry;
import _inventory._inventory_api.domain.enums.RegistryLabel;
import _inventory._inventory_api.domain.exceptions.JustificationNotFoundException;
import _inventory._inventory_api.domain.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.domain.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.domain.exceptions.items.InvalidQuantityException;
import _inventory._inventory_api.domain.records.ItemAndCategory;
import _inventory._inventory_api.domain.dto.ItemAndRegistryDTO;
import _inventory._inventory_api.domain.records.ItemDelete;
import _inventory._inventory_api.repositories.InventoryRepository;
import _inventory._inventory_api.repositories.RegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    public Page<InventoryItem> findAll(int page, int size, String sort) {
        Sort sortable = Sort.by(Sort.Direction.fromString(sort.split(",")[1]), sort.split(",")[0]);
        var pageable = PageRequest.of(page, size, sortable);
        return inventoryRepo.findAll(pageable);
    }

    public InventoryItem findById(Long itemId) {
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemId);
        if (optionalItem.isPresent()) return optionalItem.get();
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
        registryRepository.save(new Registry(savedItem.getId(), savedItem.getItem(), RegistryLabel.ADD, "Add a item", recoverUsername()));
        return savedItem;
    }

    public String removeItem(ItemDelete item) {
        var itemId = item.id();
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemId);
        if (optionalItem.isPresent()) {
            if (item.justification() == null || item.justification().isEmpty())
                throw new JustificationNotFoundException();
            var itemDB = optionalItem.get();
            registryRepository.save(new Registry(itemDB.getId(), itemDB.getItem(),RegistryLabel.REMOVE, item.justification(), recoverUsername()));
            inventoryRepo.deleteById(itemId);
            return "Item " + itemId + " deleted";
        }
        throw new ItemIdNotFoundException(itemId);
    }

    public InventoryItem updateItem(InventoryItem itemUpdate) {
        Optional<InventoryItem> optionalItem = inventoryRepo.findById(itemUpdate.getId());
        if (optionalItem.isPresent()) {
            var itemDB = getUpdateItem(optionalItem.get(), itemUpdate);
            var updatedItem = inventoryRepo.save(itemDB);
            registryRepository.save(new Registry(updatedItem.getId(), updatedItem.getItem(), RegistryLabel.UPDATE, "Update a item", recoverUsername()));
            return updatedItem;
        }
        throw new ItemIdNotFoundException(itemUpdate.getId());
    }

    private InventoryItem getUpdateItem(InventoryItem itemDB, InventoryItem itemUpdate){
        var item = itemUpdate.getItem() == null ? itemDB.getItem() : itemUpdate.getItem();
        var description = itemUpdate.getDescription() == null ? itemDB.getDescription() : itemUpdate.getDescription();
        var quantity = itemUpdate.getQuantity() == null ? itemDB.getQuantity() : itemUpdate.getQuantity();
        var categories = itemUpdate.getCategory() == null ? itemDB.getCategory() : itemUpdate.getCategory();
        itemDB.setItem(item);
        itemDB.setDescription(description);
        itemDB.setQuantity(quantity);
        itemDB.setCategory(categories);
        return itemDB;
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
            if (itemAndRegistryDTO.getJustification() == null || itemAndRegistryDTO.getJustification().isEmpty())
                throw new JustificationNotFoundException();
            registryRepository.save(new Registry(itemSaved.getId(), itemSaved.getItem(), label, itemAndRegistryDTO.getJustification(), recoverUsername()));
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

    private String recoverUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) return authentication.getName();
        return null;
    }
}

