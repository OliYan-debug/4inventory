package _inventory._inventory_api.domain.dto;

public record ResetPasswordDTO(String login, String password, String newPassword) {
}
