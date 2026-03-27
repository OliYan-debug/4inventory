package oliyan_debug.inventory_api.domain.exceptions.items;


public class InvalidItemNameException extends RuntimeException {
    public InvalidItemNameException(String message) {
        super(message);
    }
}
