package oliyan_debug.inventory_api.modules.inventory.exceptions;

public class ItemIdNotFoundException extends RuntimeException {
    public ItemIdNotFoundException(Long id) {
        super("Item with id "+ id + " not found!" );
    }
}
