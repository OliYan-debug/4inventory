package _inventory._inventory_api.domain.dto;

import _inventory._inventory_api.domain.enums.UserRoles;

public record UserJsonDTO(String id, String name, String username, String password, UserRoles role) {
}
