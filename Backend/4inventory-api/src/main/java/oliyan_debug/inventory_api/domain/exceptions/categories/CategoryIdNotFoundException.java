package oliyan_debug.inventory_api.domain.exceptions.categories;

public class CategoryIdNotFoundException extends RuntimeException{
    public CategoryIdNotFoundException(Long id) {
        super("Category with id "+ id + " not found!" );
    }
}
