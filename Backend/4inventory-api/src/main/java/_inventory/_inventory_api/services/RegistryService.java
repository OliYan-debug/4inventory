package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.entities.Registry;
import _inventory._inventory_api.repositories.RegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class RegistryService {
    @Autowired
    RegistryRepository registryRepository;

    public Page<Registry> findAll(int page, int size, String sort) {
        Sort sortable = Sort.by(Sort.Direction.fromString(sort.split(",")[1]), sort.split(",")[0]);
        var pageable = PageRequest.of(page, size, sortable);
        return registryRepository.findAll(pageable);
    }

}
