package com.revature.dto;

import com.revature.models.Reimbursement;

import java.math.BigDecimal;

public class ReimbursementDTO {
    private final Long id;
    private String description;
    private BigDecimal amount;
    private final Reimbursement.Status status;
    private final Long userId;
    private final Long approverId;
    private final String comment;

    public ReimbursementDTO(Long id, String description, BigDecimal amount, String status, Long userId, Long approverId, String comment){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.status = status != null ? Reimbursement.Status.valueOf(status) : Reimbursement.Status.PENDING;
        this.userId = userId;
        this.approverId = approverId;
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Reimbursement.Status getStatus() {
        return status;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getApproverId() {
        return approverId;
    }

    public String getComment() {
        return comment;
    }

    @Override
    public String toString() {
        return "ReimbursementDTO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status=" + status +
                ", userId=" + userId +
                ", approverId=" + approverId +
                ", comment='" + comment + '\'' +
                '}';
    }

    public void setAmount(String newAmount) {
        this.amount = new BigDecimal(newAmount);
    }

    public void setDescription(String newDescription) {
        this.description = newDescription;
    }

}
