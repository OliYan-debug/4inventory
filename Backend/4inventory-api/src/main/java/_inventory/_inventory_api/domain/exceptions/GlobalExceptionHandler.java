package _inventory._inventory_api.domain.exceptions;

import _inventory._inventory_api.domain.exceptions.security.RegisterException;
import _inventory._inventory_api.domain.exceptions.users.UserException;
import _inventory._inventory_api.domain.utils.ResponseErrorHandler;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private ResponseErrorHandler responseErrorHandler;

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<Object> handleNullPointerException(NullPointerException e) {
        return responseErrorHandler.generate(HttpStatus.BAD_REQUEST, "Null values are not valid, please review your request");
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleMessageNotReadable(HttpMessageNotReadableException e) {
        return responseErrorHandler.generate(HttpStatus.BAD_REQUEST, "JSON parse error: Cannot deserialize some values, please review the json you sent");
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<Object> handleJWTVerificationException(JWTVerificationException e) {
        return responseErrorHandler.generate(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(RegisterException.class)
    public ResponseEntity<Object> handleRegisterException(RegisterException e) {
        return responseErrorHandler.generate(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<Object> handleUserException(UserException e) {
        return responseErrorHandler.generate(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
