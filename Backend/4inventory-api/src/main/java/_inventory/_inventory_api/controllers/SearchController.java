package _inventory._inventory_api.controllers;

import _inventory._inventory_api.domain.entities.InventoryItem;
import _inventory._inventory_api.services.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping()
    @Operation(summary = "Search a item by name")
    public ResponseEntity<List<InventoryItem>> search(@RequestParam String s) {
        return ResponseEntity.ok(searchService.search(s));
    }
}
