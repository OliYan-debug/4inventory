package oliyan_debug.inventory_api.modules.inventory.exceptions;

public class InvalidQuantityException extends RuntimeException{
    public InvalidQuantityException(String message) {
        super(message);
    }
}
