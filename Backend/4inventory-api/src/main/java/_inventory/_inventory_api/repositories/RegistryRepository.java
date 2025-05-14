package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.Registry;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface RegistryRepository extends PagingAndSortingRepository<Registry, Long> {
    void save(Registry addAItem);

    void deleteAll();

    List<Registry> findAll();

    Optional<List<Registry>> findByItemId(Long itemId);
}
