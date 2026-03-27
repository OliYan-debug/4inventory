package oliyan_debug.inventory_api.domain.exceptions.categories;

public class CategoryAlreadyExistsException extends RuntimeException {
    public CategoryAlreadyExistsException(String name) {
        super("Category with name "+name+ " already exists");
    }
}
