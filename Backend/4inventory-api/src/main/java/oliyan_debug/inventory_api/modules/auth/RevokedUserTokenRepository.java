package oliyan_debug.inventory_api.modules.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RevokedUserTokenRepository extends JpaRepository<RevokedUserToken, String> {
}
