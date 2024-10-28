package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.services.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping(value = "/{textToSearch}")
    @Operation(summary = "Search a item by name")
    public ResponseEntity<List<InventoryItem>> search(@PathVariable String textToSearch) {
        return ResponseEntity.ok(searchService.search(textToSearch));
    }
}
