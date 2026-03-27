package oliyan_debug.inventory_api.domain.exceptions.items;

public class InvalidQuantityException extends RuntimeException{
    public InvalidQuantityException(String message) {
        super(message);
    }
}
