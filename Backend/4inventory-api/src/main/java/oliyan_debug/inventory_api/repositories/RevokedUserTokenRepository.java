package oliyan_debug.inventory_api.repositories;

import oliyan_debug.inventory_api.domain.entities.security.RevokedUserToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevokedUserTokenRepository extends JpaRepository<RevokedUserToken, String> {
}
