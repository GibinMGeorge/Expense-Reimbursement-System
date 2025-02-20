package com.revature.controllers;

import com.revature.dto.ReimbursementDTO;
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
@RequestMapping("/api/v1/reimbursements")

public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService, UserService userService) {
        this.reimbursementService = reimbursementService;
    }

    // get all reimbursements or get by status
    @GetMapping
    public ResponseEntity<List<ReimbursementDTO>> getAllReimbursements(@RequestParam(required = false) String status) {
        try {
            List<ReimbursementDTO> reimbursements;

            if (status == null) {
                reimbursements = reimbursementService.getAllReimbursements();
            } else {
                reimbursements = reimbursementService.getReimbursementsByStatus(status);
            }

            return ResponseEntity.ok(reimbursements);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Resolve reimbursements by either approve or reject
    @PatchMapping("/{reimbursementId}")
    public ResponseEntity<ReimbursementDTO> resolveReimbursement(
            @PathVariable Long reimbursementId,
            @RequestBody Map<String, String> request
    ) {
        ReimbursementDTO reimbursementDTO = reimbursementService.resolveReimbursement(
                reimbursementId,
                request.get("status"),
                request.get("comment"),
                Long.valueOf(request.get("approverId"))
        );

        return ResponseEntity.ok(reimbursementDTO);
    }
}
