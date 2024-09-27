package _inventory._inventory_api.models.exceptions.items;


public class InvalidItemNameException extends RuntimeException {
    public InvalidItemNameException(String message) {
        super(message);
    }
}
