package oliyan_debug.inventory_api.modules.backup;

import oliyan_debug.inventory_api.modules.user.UserRoles;

public record UserJsonDTO(String id, String name, String username, String password, UserRoles role) {
}
