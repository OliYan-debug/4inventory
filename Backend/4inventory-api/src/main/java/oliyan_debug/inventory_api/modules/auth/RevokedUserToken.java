package oliyan_debug.inventory_api.modules.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Table(name = "tb_user_token")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RevokedUserToken {
    @Id
    private String token;
    private String username;
}
