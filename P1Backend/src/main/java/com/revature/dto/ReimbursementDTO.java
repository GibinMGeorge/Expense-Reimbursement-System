package com.revature.dto;

import com.revature.models.Reimbursement;

import java.math.BigDecimal;

public class ReimbursementDTO {
    private final Long id;
    private String description;
    private BigDecimal amount;
    private final Reimbursement.Status status;
    private final Long userId;

    public ReimbursementDTO(Long id, String description, BigDecimal amount, String status, Long userId){
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.status = status != null ? Reimbursement.Status.valueOf(status) : Reimbursement.Status.PENDING;
        this.userId = userId;
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

    @Override
    public String toString() {
        return "ReimbursementDTO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status=" + status +
                ", userId=" + userId +
                '}';
    }

    public void setAmount(String newAmount) {
        this.amount = new BigDecimal(newAmount);
    }

    public void setDescription(String newDescription) {
        this.description = newDescription;
    }

}
