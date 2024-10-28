package _inventory._inventory_api.models.exceptions.categories;

public class InvalidCategoryException extends RuntimeException{

    public InvalidCategoryException(String message) {
        super(message);
    }
}
