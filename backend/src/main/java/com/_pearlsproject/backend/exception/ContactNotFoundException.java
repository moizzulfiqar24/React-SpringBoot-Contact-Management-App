package com._pearlsproject.backend.exception;

public class ContactNotFoundException extends RuntimeException {
    public ContactNotFoundException(Long id) {
        super("Could not find contact with id " + id);  // Corrected message
    }
}
