package com.revature.exception;

public class ReimbursementNotFoundException extends RuntimeException {
    public ReimbursementNotFoundException(String message) {
        super(message);
    }
}
