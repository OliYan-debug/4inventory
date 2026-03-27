package oliyan_debug.inventory_api.domain.dto;

import oliyan_debug.inventory_api.domain.enums.UserRoles;

public record RegisterDTO(String name, String login, String password, UserRoles role) {
}
