package oliyan_debug.inventory_api.modules.category.exceptions;

public class CategoryAlreadyExistsException extends RuntimeException {
    public CategoryAlreadyExistsException(String name) {
        super("Category with name "+name+ " already exists");
    }
}
