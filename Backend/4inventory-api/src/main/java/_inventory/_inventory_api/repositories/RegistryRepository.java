package _inventory._inventory_api.repositories;

import _inventory._inventory_api.models.entities.Registry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistryRepository extends JpaRepository<Registry, Long> {
}
