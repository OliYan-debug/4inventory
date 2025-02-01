package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.entities.Registry;
import _inventory._inventory_api.domain.enums.RegistryLabel;
import _inventory._inventory_api.domain.exceptions.items.InvalidItemNameException;
import _inventory._inventory_api.domain.exceptions.items.ItemIdNotFoundException;
import _inventory._inventory_api.repositories.RegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegistryService {
    @Autowired
    RegistryRepository registryRepository;

    public Page<Registry> findAll(int page, int size, String sort) {
        Sort sortable = Sort.by(Sort.Direction.fromString(sort.split(",")[1]), sort.split(",")[0]);
        var pageable = PageRequest.of(page, size, sortable);
        return registryRepository.findAll(pageable);
    }

    public List<Registry> filterById(Integer id, String label){
        var registriesOptional = registryRepository.findByItemId(Integer.toUnsignedLong(id));
        List<Registry> filteredRegistries = new ArrayList<>();
        if(registriesOptional.isEmpty()) throw new ItemIdNotFoundException(Integer.toUnsignedLong(id));
        if(label.equals("null")) return registriesOptional.get();
        if(!RegistryLabel.contains(label))throw new InvalidItemNameException("Label "+ label+" not found");
        for(Registry r : registriesOptional.get()){
            if(r.getLabel().name().equals(label)) filteredRegistries.add(r);
        }
        return filteredRegistries;
    }

}
