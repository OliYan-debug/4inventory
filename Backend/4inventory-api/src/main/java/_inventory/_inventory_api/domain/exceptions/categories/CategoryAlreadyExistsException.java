package _inventory._inventory_api.models.exceptions.categories;

public class CategoryAlreadyExistsException extends RuntimeException {
    public CategoryAlreadyExistsException(String name) {
        super("Category with name "+name+ " already exists");
    }
}
