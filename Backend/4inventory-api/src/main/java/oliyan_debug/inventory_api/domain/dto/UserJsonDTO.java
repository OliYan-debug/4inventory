package oliyan_debug.inventory_api.domain.dto;

import oliyan_debug.inventory_api.domain.enums.UserRoles;

public record UserJsonDTO(String id, String name, String username, String password, UserRoles role) {
}
