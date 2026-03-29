package oliyan_debug.inventory_api.modules.auth.exceptions;

public class InvalidAuthException extends RuntimeException {
    public InvalidAuthException(String msg){
        super(msg);
    }
}
