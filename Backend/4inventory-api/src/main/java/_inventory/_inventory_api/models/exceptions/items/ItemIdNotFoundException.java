package _inventory._inventory_api.models.exceptions.items;

public class ItemIdNotFoundException extends RuntimeException {
    public ItemIdNotFoundException(Long id) {
        super("Item with id "+ id + " not found!" );
    }
}
