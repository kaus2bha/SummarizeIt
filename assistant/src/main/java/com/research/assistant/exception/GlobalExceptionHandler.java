package com.research.assistant.exception;

import com.research.assistant.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> handleIllegalArgument(IllegalArgumentException ex) {

        ApiResponse response = new ApiResponse(
                false,
                null,
                ex.getMessage()
        );

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception ex) {

        ApiResponse response = new ApiResponse(
                false,
                null,
                "Internal Server Error"
        );

        return ResponseEntity.internalServerError().body(response);
    }
}