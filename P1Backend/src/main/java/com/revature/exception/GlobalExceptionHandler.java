package com.revature.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

     // Handle UserNotFoundException and return CustomErrorResponse

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleUserNotFoundException(UserNotFoundException e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }


     // Handle InvalidRoleException and return CustomErrorResponse

    @ExceptionHandler(InvalidUserRoleException.class)
    public ResponseEntity<CustomErrorResponse> handleInvalidUserRoleException(InvalidUserRoleException e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }


     // Handle InvalidStatusException and return CustomErrorResponse

    @ExceptionHandler(InvalidReimbursementStatusException.class)
    public ResponseEntity<CustomErrorResponse> handleInvalidReimbursementStatusException(InvalidReimbursementStatusException e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

     // Handle UserCreationException and return CustomErrorResponse

    @ExceptionHandler(UserCreationException.class)
    public ResponseEntity<CustomErrorResponse> handleUserCreationException(UserCreationException e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

     //Handle ReimbursementNotFoundException and return CustomErrorResponse

    @ExceptionHandler(ReimbursementNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleReimbursementNotFoundException(ReimbursementNotFoundException e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    //Handle InvalidReimbursementUpdateException and return CustomErrorResponse

    @ExceptionHandler(InvalidReimbursementUpdateException.class)
    public ResponseEntity<CustomErrorResponse> handleInvalidReimbursementUpdateException(InvalidReimbursementUpdateException e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

     // Handle Exception and return CustomErrorResponse

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleException(Exception e) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

}
