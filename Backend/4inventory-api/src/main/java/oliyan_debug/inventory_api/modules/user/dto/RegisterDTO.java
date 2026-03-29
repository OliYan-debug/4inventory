package oliyan_debug.inventory_api.modules.user.dto;

import oliyan_debug.inventory_api.modules.user.UserRoles;

public record RegisterDTO(String name, String login, String password, UserRoles role) {
}
