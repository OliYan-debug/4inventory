package _inventory._inventory_api.domain.exceptions.categories;

public class CategoryIdNotFoundException extends RuntimeException{
    public CategoryIdNotFoundException(Long id) {
        super("Category with id "+ id + " not found!" );
    }
}
