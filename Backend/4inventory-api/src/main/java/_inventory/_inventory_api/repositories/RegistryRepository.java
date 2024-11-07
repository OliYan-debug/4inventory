package _inventory._inventory_api.repositories;

import _inventory._inventory_api.domain.entities.Registry;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RegistryRepository extends PagingAndSortingRepository<Registry, Long> {
    void save(Registry addAItem);

    void deleteAll();
}
