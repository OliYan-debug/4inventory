package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.user.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, String> {

    User findByUsername(String username);

    void save(User user);

    void deleteById(String user);

    Optional<User> findById(String id);
}
