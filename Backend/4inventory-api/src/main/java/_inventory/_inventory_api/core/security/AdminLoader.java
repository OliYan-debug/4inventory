package _inventory._inventory_api.config.security;

import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.enums.UserRoles;
import _inventory._inventory_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminLoader implements CommandLineRunner {
    @Autowired
    UserRepository repository;


    @Override
    public void run(String... args) throws Exception {
        var admin = repository.findByUsername("admin");
        if(admin == null){
            var adminUser = new User("admin","admin", new BCryptPasswordEncoder().encode("admin123"), UserRoles.ADMIN);
            repository.save(adminUser);
        }
    }
}
