package _inventory._inventory_api.models.exceptions;

public class JustificationNotFoundException extends RuntimeException{
    public JustificationNotFoundException() {
        super("Justification must not be empty");
    }
}
