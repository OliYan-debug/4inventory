package _inventory._inventory_api.domain.utils;

import _inventory._inventory_api.domain.dto.RegisterDTO;
import _inventory._inventory_api.domain.exceptions.security.RegisterException;
import _inventory._inventory_api.repositories.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@NoArgsConstructor
public class UserValidator {

    @Autowired
    private UserRepository userRepository;

    public void validateUserRegister(RegisterDTO data) {
        if (userRepository.findByUsername(data.login()) != null)
            throw new RegisterException("Username already exists");
        if (!passwordRegexMatcher(data.password()))
            throw new RegisterException("Password must match requirements: UpperCase letter, LowerCase letter, Number and at least 8 characters");
        if (data.name().isBlank() || data.login().isBlank())
            throw new RegisterException("Username and Name must not be blank");
        if(!data.login().replaceAll("\\s", "").equals(data.login()))
            throw new RegisterException("Username must not contain spaces");
    }

    public Boolean passwordRegexMatcher(String password) {
        var pattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$");
        var matcher = pattern.matcher(password);
        return matcher.matches();
    }


}
