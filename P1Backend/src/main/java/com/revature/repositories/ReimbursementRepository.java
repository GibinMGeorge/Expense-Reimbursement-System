package com.revature.repositories;

import com.revature.models.Reimbursement;

import java.util.List;
import java.util.Optional;

public interface ReimbursementRepository {

    // find reimbursements by status
    List<Reimbursement> findByStatus(Reimbursement.Status status);

    // find reimbursements by userId
    List<Reimbursement> findByUserId(Long userId);

    // find reimbursements by userId and status
    List<Reimbursement> findByUserIdAndStatus(Long userId, Reimbursement.Status status);

    List<Reimbursement> findAll();

    Optional<Reimbursement> findById(Long reimbursementId);

    Reimbursement save(Reimbursement reimbursement);
}
