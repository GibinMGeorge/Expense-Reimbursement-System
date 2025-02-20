package com.revature.service;

import com.revature.dto.UserDTO;
import com.revature.mapper.UserMapper;
import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    // get all users and return
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        return userMapper.toDTOList(users);
    }

    // get a user by id and return
    public UserDTO getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(userMapper::toDTO)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));
    }

    // get a user entity by id and return user entity
    public User getUserEntityById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));
    }

    // create a new user and return the created user
    public UserDTO createUser(User user) {
        try {
            User createdUser = userRepository.save(user);

            return userMapper.toDTO(createdUser);
        } catch (Exception e) {
            throw new UserCreationException("Failed to create user: " + e.getMessage());
        }
    }

    // update a user role and return updated user
    public UserDTO updateUserRole(Long userId, String newRole) {
        User.Role role;

        try {
            role = User.Role.valueOf(newRole);
        } catch (IllegalArgumentException e) {
            throw new InvalidUserRoleException("Invalid role: " + newRole);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));

        user.setRole(role);
        userRepository.save(user);

        return userMapper.toDTO(user);
    }

    // delete a user
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));

        userRepository.delete(user);
    }

}
