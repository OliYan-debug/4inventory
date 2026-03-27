package oliyan_debug.inventory_api.domain.exceptions.categories;

public class InvalidCategoryException extends RuntimeException{

    public InvalidCategoryException(String message) {
        super(message);
    }
}
