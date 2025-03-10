package com.revature.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "reimbursements")

public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;      // PENDING, APPROVED, DENIED

    @ManyToOne
    @JoinColumn(name = "approver_id", referencedColumnName = "id")
    private User approver;

    @Column(columnDefinition = "TEXT")
    private String comment;

    public Reimbursement() {
    }

    // Constructor for creating a new reimbursement

    public Reimbursement(User user, String description, BigDecimal amount, Status status, User approver, String comment) {
        this.user = user;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.approver = approver;
        this.comment = comment;
    }

    // Constructor for retrieving an existing reimbursement


    public Reimbursement(Long id, User user, String description, BigDecimal amount, Status status, User approver, String comment) {
        this.id = id;
        this.user = user;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.approver = approver;
        this.comment = comment;
    }

    // getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getApprover() {
        return approver;
    }

    public void setApprover(User approver) {
        this.approver = approver;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "id=" + id +
                ", user=" + user +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status=" + status +
                '}';
    }

    // Enum for status of the reimbursement
    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}
