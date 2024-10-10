package _inventory._inventory_api.services;

import _inventory._inventory_api.models.entities.Registry;
import _inventory._inventory_api.repositories.RegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistryService {
    @Autowired
    RegistryRepository registryRepository;

    public List<Registry> findAll() {
        return registryRepository.findAll();
    }

}
