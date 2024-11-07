package _inventory._inventory_api.domain.enums;


public enum RegistryLabel {
    CHECK_IN("CHECK-IN"),
    CHECK_OUT("CHECK-OUT"),
    ADD("ADD"),
    REMOVE("REMOVE"),
    UPDATE("UPDATE");

    private String label;

    RegistryLabel(String label) {
        this.label = label;
    }

}
