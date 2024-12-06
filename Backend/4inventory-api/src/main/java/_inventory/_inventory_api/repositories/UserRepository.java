package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);
}
