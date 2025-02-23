package com.revature.controllers;

import com.revature.dto.LoginDTO;
import com.revature.dto.UserDTO;
import com.revature.models.User;
import com.revature.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/gmg/auth")
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

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody LoginDTO loginRequestDTO, HttpSession session) {
        UserDTO loggedInUser = authService.loginUser(loginRequestDTO, session);

        return ResponseEntity.ok(loggedInUser);
    }

    //logout a user
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(HttpSession session) {
        authService.logoutUser(session);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");

        return ResponseEntity.ok(response);
    }

}
