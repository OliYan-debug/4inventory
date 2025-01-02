package _inventory._inventory_api.domain.exceptions.security;

public class InvalidAuthException extends RuntimeException {
    public InvalidAuthException(String msg){
        super(msg);
    }
}
