package com.revature.mapper;

import com.revature.dto.UserDTO;
import com.revature.models.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    // maps a userDTO to a user entity and return user entity
    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUsername(userDTO.getUsername());
        user.setRole(User.Role.valueOf(userDTO.getRole().toString().toUpperCase()));

        return user;
    }

    // maps a user entity to a userDTO and return userDTO
    public UserDTO toDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getRole().name()
        );
    }

    // maps a list of user entities and return it
    public List<UserDTO> toDTOList(List<User> users) {
        return users.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

}
