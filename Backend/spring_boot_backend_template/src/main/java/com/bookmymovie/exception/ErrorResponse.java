package com.bookmymovie.exception;

import java.time.LocalDateTime;
import java.util.List;

public class ErrorResponse {
    private String message;
    private LocalDateTime timestamp;
    private String errorCode;
    private List<String> details;

    public ErrorResponse(String message, LocalDateTime timestamp, String errorCode) {
        this.message = message;
        this.timestamp = timestamp;
        this.errorCode = errorCode;
    }

    public ErrorResponse(String message, LocalDateTime timestamp, String errorCode, List<String> details) {
        this.message = message;
        this.timestamp = timestamp;
        this.errorCode = errorCode;
        this.details = details;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}
