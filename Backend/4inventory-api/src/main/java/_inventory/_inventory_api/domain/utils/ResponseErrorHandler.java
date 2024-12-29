package _inventory._inventory_api.domain.utils;

import _inventory._inventory_api.domain.records.MessageHandler;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@NoArgsConstructor
@Slf4j
@Service
public class ResponseErrorHandler {

    public ResponseEntity<Object> generate(HttpStatus code, String message) {
        log.warn(message);
        return ResponseEntity.status(code).body(new MessageHandler(code.value(), message));
    }
}
