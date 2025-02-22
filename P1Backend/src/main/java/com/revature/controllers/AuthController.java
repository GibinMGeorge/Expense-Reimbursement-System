package com.revature.controllers;

import com.revature.dto.UserDTO;
import com.revature.models.User;
import com.revature.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")

public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //register a new user and return the created user

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {
        UserDTO createdUser = authService.registerUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

}
