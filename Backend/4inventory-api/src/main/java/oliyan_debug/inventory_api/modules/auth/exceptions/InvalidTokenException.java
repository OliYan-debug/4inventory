package oliyan_debug.inventory_api.modules.auth.exceptions;

public class InvalidTokenException extends RuntimeException{
    public InvalidTokenException(){
        super("Invalid token, please generate a new");
    }
}
