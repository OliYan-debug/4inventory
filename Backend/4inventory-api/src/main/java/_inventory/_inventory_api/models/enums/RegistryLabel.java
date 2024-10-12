package _inventory._inventory_api.models.enums;


public enum RegistryLabel {
    CHECK_IN("CHECK-IN"),
    CHECK_OUT("CHECK-OUT"),
    ADD("ADD"),
    REMOVE("REMOVE");

    private String label;

    RegistryLabel(String label) {
        this.label = label;
    }

}
