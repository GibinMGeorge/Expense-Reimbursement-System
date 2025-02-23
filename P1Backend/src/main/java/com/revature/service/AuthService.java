package com.revature.service;

import com.revature.dto.LoginDTO;
import com.revature.dto.UserDTO;
import com.revature.exception.MissingRequiredFieldsException;
import com.revature.exception.UserCreationException;
import com.revature.exception.UserNotFoundException;
import com.revature.mapper.UserMapper;
import com.revature.models.User;
import com.revature.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public AuthService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    //register and return new user

    public UserDTO registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UserCreationException("Username already exists");
        }

        try {
            User createdUser = userRepository.save(user);

            return userMapper.toDTO(createdUser);
        } catch (Exception e) {
            throw new UserCreationException("Failed to create user: " + e.getMessage());
        }
    }

    public UserDTO loginUser(LoginDTO loginRequestDTO, HttpSession session) {
        if (loginRequestDTO.getUsername() == null || loginRequestDTO.getUsername().isBlank()) {
            throw new MissingRequiredFieldsException("Username is required");
        }

        if (loginRequestDTO.getPassword() == null || loginRequestDTO.getPassword().isBlank()) {
            throw new MissingRequiredFieldsException("Password is required");
        }

        User user = userRepository.findByUsernameAndPassword(
                        loginRequestDTO.getUsername(),
                        loginRequestDTO.getPassword()
                )
                .orElseThrow(() -> new UserNotFoundException("Invalid username or password"));

        session.setAttribute("userId", user.getId());
        session.setAttribute("username", user.getUsername());
        session.setAttribute("role", user.getRole());

        return userMapper.toDTO(user);
    }

}
