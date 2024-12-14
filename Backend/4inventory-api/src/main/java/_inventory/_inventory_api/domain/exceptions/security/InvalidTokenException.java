package _inventory._inventory_api.domain.exceptions.security;

public class InvalidTokenException extends RuntimeException{
    public InvalidTokenException(){
        super("Invalid token, please generate a new");
    }
}
