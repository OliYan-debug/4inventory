package _inventory._inventory_api.domain.dto;

import _inventory._inventory_api.domain.enums.UserRoles;

public record RegisterDTO(String login, String password, UserRoles role) {
}
