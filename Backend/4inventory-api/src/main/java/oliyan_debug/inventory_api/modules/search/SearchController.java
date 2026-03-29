package oliyan_debug.inventory_api.modules.search;

import io.swagger.v3.oas.annotations.Operation;
import oliyan_debug.inventory_api.modules.inventory.InventoryItem;

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
