package _inventory._inventory_api.services;

import _inventory._inventory_api.domain.dto.ChangeRoleDTO;
import _inventory._inventory_api.domain.dto.ProfileDTO;
import _inventory._inventory_api.domain.dto.UserDTO;
import _inventory._inventory_api.domain.entities.user.User;
import _inventory._inventory_api.domain.exceptions.security.InvalidAuthException;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.domain.utils.UserToken;
import _inventory._inventory_api.repositories.UserRepository;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private UserToken userToken;

    public ProfileDTO getProfile(String authHeader) {
        var userDB = userToken.getUserByToken(authHeader);
        if (userDB == null) throw new JWTVerificationException("Invalid Token");
        return new ProfileDTO(userDB.getName(), userDB.getUsername(), userDB.getRole().getRole());
    }

    public Page<UserDTO> getUsers(int page, int size, String sort) {
        Sort sortable = Sort.by(Sort.Direction.fromString(sort.split(",")[1]), sort.split(",")[0]);
        var pageable = PageRequest.of(page, size, sortable);
        var users = repository.findAll(pageable);
        return users.map(user -> new UserDTO(user.getId(), user.getName(), user.getUsername(), user.getRole().getRole()));
    }

    public void resetPassword(String uuid) {
        var user = checkUsername(uuid);
        var encryptedPassword = new BCryptPasswordEncoder().encode(user.getUsername().toUpperCase());
        user.setPassword(encryptedPassword);
        repository.save(user);
    }

    public void deleteUser(String uuid){
        var userDB = repository.findById(uuid);
        if (userDB.isEmpty()) throw new UserException("User with Id " + uuid + " not found in database");
        var user = checkUsername(userDB.get().getId());
        repository.deleteById(user.getId());
    }

    public void changeUserRole(String uuid, ChangeRoleDTO data){
        var user = checkUsername(uuid);
        if(user.getRole().equals(data.role())) throw new UserException("User already have this role");
        user.setRole(data.role());
        repository.save(user);
    }

    private User checkUsername(String uuid){
        var user = repository.findById(uuid);
        if (user.isEmpty()) throw new UserException("User with Id " + uuid + " not found in database");
        var userDB = user.get();
        if (userDB.getUsername().equals("admin")) throw new InvalidAuthException("You can't change the default admin account");
        if(userDB.getName() == null) {
            userDB.setName("4inventory");
            repository.save(userDB);
        };
        return userDB;
    }

}
