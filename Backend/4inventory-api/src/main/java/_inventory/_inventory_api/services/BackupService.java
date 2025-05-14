package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.dto.UserJsonDTO;
import _inventory._inventory_api.domain.entities.Category;
import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.domain.entities.Registry;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.repositories.CategoryRepository;
import _inventory._inventory_api.repositories.InventoryRepository;
import _inventory._inventory_api.repositories.RegistryRepository;
import _inventory._inventory_api.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
public class BackupService {
    private final ObjectMapper jacksonObjectMapper;
    private final InventoryService inventoryService;
    private final InventoryRepository inventoryRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final RegistryRepository registryRepository;
    private final ObjectMapper objectMapper;

    BackupService(InventoryService inventoryService, ObjectMapper jacksonObjectMapper, InventoryRepository inventoryRepository, CategoryRepository categoryRepository, CategoryService categoryService, UserRepository userRepository, RegistryRepository registryRepository, ObjectMapper objectMapper) {
        this.inventoryService = inventoryService;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.inventoryRepository = inventoryRepository;
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
        this.userRepository = userRepository;
        this.registryRepository = registryRepository;
        this.objectMapper = objectMapper;
    }

    public byte[] backupInventoryToJson() throws JsonProcessingException {
        Map<String, Object> backup4in = new HashMap<>();
        var items = inventoryService.findAll();
        var users = userRepository.findAll().stream().map(user -> new UserJsonDTO(user.getId(), user.getName(), user.getUsername(), user.getPassword(), user.getRole())).toList();
        var registry = registryRepository.findAll();
        backup4in.put("items", items);
        backup4in.put("users", users);
        backup4in.put("registries", registry);
        return jacksonObjectMapper.writeValueAsBytes(backup4in);
    }

    public void loadBackup(Map<String, Object> backup) throws JsonProcessingException {
        var itemsJson = objectMapper.writeValueAsString(backup.get("items"));
        var items = objectMapper.readValue(itemsJson, new TypeReference<List<InventoryItem>>() {
        });
        var usersJson = objectMapper.writeValueAsString(backup.get("users"));
        var users = objectMapper.readValue(usersJson, new TypeReference<List<UserJsonDTO>>() {
        });
        recoverUsers(users);
        var registriesJson = objectMapper.writeValueAsString(backup.get("registries"));
        var registries = objectMapper.readValue(registriesJson, new TypeReference<List<Registry>>() {
        });
        recoverItemsAndRegistries(items, registries);
    }
    private void recoverItemsAndRegistries(List<InventoryItem> items, List<Registry> registries) {
        for (InventoryItem item : items) {
            System.out.println(item);
            if (!item.getCategory().isEmpty()) {
                Set<Category> categorySet = new HashSet<>();
                for (Category category : item.getCategory()) {
                    var categoriesDB = categoryRepository.findByNameIgnoreCase(category.getName());
                    if (!categoriesDB.isEmpty()) categorySet.add(categoriesDB.get(0));
                    else {
                        var categorySaved = categoryService.saveCategory(category);
                        categorySet.add(categorySaved);
                    }
                }
                item.setCategory(categorySet);
            }
            var itemSaved = inventoryRepository.save(item);
            for (Registry reg : registries) {
                if (reg.getItemId().equals(item.getId())) {
                    reg.setItemId(itemSaved.getId());
                }
            }
        }
        recoverRegistries(registries);
    }

    private void recoverUsers(List<UserJsonDTO> usersDTO) {
        usersDTO.forEach(dto -> {
            if (!dto.name().contentEquals("admin")) userRepository.save(new User(dto));
        });
    }

    private void recoverRegistries(List<Registry> registries) {
        registries.forEach(registryRepository::save);
    }

    public String generateTimestamp() {
        var myDateObj = LocalDateTime.now();
        var myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy_HHmmss");
        return myDateObj.format(myFormatObj);
    }
}
