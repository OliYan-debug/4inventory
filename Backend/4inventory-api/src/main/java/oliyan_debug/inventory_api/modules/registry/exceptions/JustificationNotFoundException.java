package oliyan_debug.inventory_api.modules.registry.exceptions;

public class JustificationNotFoundException extends RuntimeException{
    public JustificationNotFoundException() {
        super("Justification must not be empty");
    }
}
