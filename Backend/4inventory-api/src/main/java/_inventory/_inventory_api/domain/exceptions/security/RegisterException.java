package _inventory._inventory_api.domain.exceptions.security;

public class RegisterException extends RuntimeException{
    public RegisterException(String message){
        super(message);
    }
}
