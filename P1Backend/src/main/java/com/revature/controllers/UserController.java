package com.revature.controllers;

import com.revature.dto.UserDTO;
import com.revature.models.User;
import com.revature.service.ReimbursementService;
import com.revature.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/users")

public class UserController {
    private final UserService userService;
    private final ReimbursementService reimbursementService;

    @Autowired
    public UserController(UserService userService, ReimbursementService reimbursementService) {
        this.userService = userService;
        this.reimbursementService = reimbursementService;
    }

    // get all users, then return list of all users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    // get a user by id and return that user
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO userDTO = userService.getUserById(userId);

        return ResponseEntity.ok(userDTO);
    }

    // create a new user and return that user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        UserDTO createdUser = userService.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // update a user role, user is selected by user id
    @PatchMapping("/{userId}/role")
    public ResponseEntity<UserDTO> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        String newRole = request.get("role");
        UserDTO updatedUser = userService.updateUserRole(userId, newRole);

        return ResponseEntity.ok(updatedUser);
    }

    // delete a user by their id
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }

    // get all reimbursements of a user by user id
    @GetMapping("/{userId}/reimbursements")
    public ResponseEntity<List<ReimbursementDTO>> getUserReimbursements(
            @PathVariable Long userId,
            @RequestParam(required = false) String status
    ) {
        List<ReimbursementDTO> reimbursements =
                (status == null)
                        ? reimbursementService.getReimbursementsByUserId(userId)
                        : reimbursementService.getReimbursementsByUserIdAndStatus(userId, status);

        return ResponseEntity.ok(reimbursements);
    }

    // create a new reimbursement and return it
    @PostMapping("/{userId}/reimbursements")
    public ResponseEntity<ReimbursementDTO> createUserReimbursement(
            @PathVariable Long userId,
            @RequestBody ReimbursementDTO reimbursementDTO
    ) {
        ReimbursementDTO createdReimbursement = reimbursementService.createReimbursement(userId, reimbursementDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdReimbursement);
    }

    // update a reimbursement
    @PatchMapping("/{userId}/reimbursements/{reimbursementId}")
    public ResponseEntity<ReimbursementDTO> updateReimbursement(
            @PathVariable Long userId,
            @PathVariable Long reimbursementId,
            @RequestBody Map<String, String> request
    ) {
        ReimbursementDTO updatedReimbursement = reimbursementService.updateReimbursement(userId, reimbursementId, request);

        return ResponseEntity.ok(updatedReimbursement);
    }

}
