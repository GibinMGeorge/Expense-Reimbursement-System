package com.revature.exception;

public class InvalidReimbursementStatusException extends RuntimeException {
    public InvalidReimbursementStatusException(String message) {
        super(message);
    }
}
