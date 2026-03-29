package oliyan_debug.inventory_api.modules.category.exceptions;

public class CategoryIdNotFoundException extends RuntimeException{
    public CategoryIdNotFoundException(Long id) {
        super("Category with id "+ id + " not found!" );
    }
}
