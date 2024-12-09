package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.security.RevokedUserToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevokedUserTokenRepository extends JpaRepository<RevokedUserToken, String> {
}
