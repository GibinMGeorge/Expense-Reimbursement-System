package com.revature.service;

import com.revature.dto.ReimbursementDTO;
import com.revature.exception.InvalidReimbursementStatusException;
import com.revature.exception.InvalidUserRoleException;
import com.revature.exception.ReimbursementNotFoundException;
import com.revature.exception.UserNotFoundException;
import com.revature.mapper.ReimbursementMapper;
import com.revature.mapper.UserMapper;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.repositories.ReimbursementRepository;
import com.revature.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReimbursementService {

    private final ReimbursementRepository reimbursementRepository;
    private final ReimbursementMapper reimbursementMapper;
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public ReimbursementService(
            ReimbursementRepository reimbursementRepository,
            ReimbursementMapper reimbursementMapper,
            UserMapper userMapper, UserService userService, UserRepository userRepository) {
        this.reimbursementRepository = reimbursementRepository;
        this.reimbursementMapper = reimbursementMapper;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // get all reimbursements and return
    public List<ReimbursementDTO> getAllReimbursements() {
        List<Reimbursement> reimbursements = reimbursementRepository.findAll();

        return reimbursementMapper.toDTOList(reimbursements);
    }

    // get reimbursements by status
    public List<ReimbursementDTO> getReimbursementsByStatus(String status) {
        Reimbursement.Status reimbursementStatus;

        try {
            reimbursementStatus = Reimbursement.Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidReimbursementStatusException("Invalid reimbursement status: " + status);
        }

        List<Reimbursement> reimbursements = reimbursementRepository.findByStatus(reimbursementStatus);

        return reimbursementMapper.toDTOList(reimbursements);
    }

    // get reimbursements by userId
    public List<ReimbursementDTO> getReimbursementsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }

        List<Reimbursement> reimbursements = reimbursementRepository.findByUserId(userId);

        return reimbursementMapper.toDTOList(reimbursements);
    }

    // get reimbursements by userId and status
    public List<ReimbursementDTO> getReimbursementsByUserIdAndStatus(Long userId, String status) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }

        try {
            Reimbursement.Status reimbursementStatus = Reimbursement.Status.valueOf(status.toUpperCase());
            List<Reimbursement> reimbursements = reimbursementRepository.findByUserIdAndStatus(userId, reimbursementStatus);

            return reimbursementMapper.toDTOList(reimbursements);
        } catch (IllegalArgumentException e) {
            throw new InvalidReimbursementStatusException("Invalid reimbursement status: " + status);
        }
    }

    // get reimbursements by id
    public Optional<Reimbursement> getReimbursementById(Long reimbursementId) {
        return reimbursementRepository.findById(reimbursementId);
    }

    // create a new reimbursement
    public ReimbursementDTO createReimbursement(Long userId, ReimbursementDTO reimbursementDTO) {
        User user = userService.getUserEntityById(userId);
        Reimbursement reimbursement = reimbursementMapper.toEntity(reimbursementDTO);
        reimbursement.setUser(user);
        Reimbursement createdReimbursement = reimbursementRepository.save(reimbursement);

        return reimbursementMapper.toDTO(createdReimbursement);
    }

    // update a reimbursement and return updated reimbursement
    public ReimbursementDTO updateReimbursement(Long userId, Long reimbursementId, Map<String, String> updates) {
        Reimbursement reimbursement = reimbursementRepository.findById(reimbursementId)
                .orElseThrow(() -> new ReimbursementNotFoundException("Reimbursement with ID " + reimbursementId + " not found."));

        if (reimbursement.getStatus() != Reimbursement.Status.PENDING || !reimbursement.getUser().getId().equals(userId)) {
            throw new InvalidReimbursementStatusException("Reimbursement is not in a pending state or does not belong to the user");
        }

        if (updates.containsKey("amount")) {
            String newAmount = updates.get("amount");

            if (newAmount == null || newAmount.isEmpty()) {
                throw new InvalidReimbursementStatusException("Invalid amount provided");
            }

            reimbursement.setAmount(new BigDecimal(newAmount));
        }

        if (updates.containsKey("description")) {
            String newDescription = updates.get("description");

            if (newDescription == null || newDescription.isEmpty()) {
                throw new InvalidReimbursementStatusException("Invalid description provided");
            }

            reimbursement.setDescription(newDescription);
        }

        Reimbursement updatedReimbursement = reimbursementRepository.save(reimbursement);

        return reimbursementMapper.toDTO(updatedReimbursement);
    }

    // resolve a reimbursement
    public ReimbursementDTO resolveReimbursement(Long reimbursementId, String status, String comment, Long approverId) {
        User approver = userService.getUserEntityById(approverId);

        if (approver.getRole() != User.Role.MANAGER) {
            throw new InvalidUserRoleException("Approver does not have the required role: MANAGER");
        }

        Reimbursement.Status reimbursementStatus;

        try {
            reimbursementStatus = Reimbursement.Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidReimbursementStatusException("Invalid reimbursement status: " + status);
        }

        Reimbursement reimbursement = reimbursementRepository.findById(reimbursementId)
                .orElseThrow(() -> new ReimbursementNotFoundException("Reimbursement not found with ID: " + reimbursementId));

        reimbursement.setStatus(reimbursementStatus);
        reimbursement.setComment(comment);
        reimbursement.setApprover(approver);

        Reimbursement updatedReimbursement = reimbursementRepository.save(reimbursement);

        return reimbursementMapper.toDTO(updatedReimbursement);
    }

    public void deleteReimbursement(Long reimbursementId) {
        Reimbursement reimbursement = reimbursementRepository.findById(reimbursementId)
                .orElseThrow(() -> new ReimbursementNotFoundException("Reimbursement not found with ID: " + reimbursementId));

        reimbursementRepository.delete(reimbursement);
    }
}
