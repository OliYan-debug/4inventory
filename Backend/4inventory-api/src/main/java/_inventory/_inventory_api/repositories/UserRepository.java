package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.user.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, String> {

    User findByUsername(String username);

    void save(User user);
}
