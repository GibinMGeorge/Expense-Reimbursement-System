package com.revature.mapper;

import com.revature.dto.ReimbursementDTO;
import com.revature.models.Reimbursement;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReimbursementMapper {

    // maps a reimbursement DTO to a reimbursement entity and return entity
    public Reimbursement toEntity(ReimbursementDTO reimbursementDTO) {
        Reimbursement reimbursement = new Reimbursement();
        reimbursement.setDescription(reimbursementDTO.getDescription());
        reimbursement.setAmount(reimbursementDTO.getAmount());
        reimbursement.setStatus(Reimbursement.Status.valueOf(reimbursementDTO.getStatus().toString().toUpperCase()));

        return reimbursement;
    }

    // maps a reimbursement entity to DTO and return DTO
    public ReimbursementDTO toDTO(Reimbursement reimbursement) {
        return new ReimbursementDTO(
                reimbursement.getId(),
                reimbursement.getDescription(),
                reimbursement.getAmount(),
                reimbursement.getStatus().name(),
                reimbursement.getUser().getId()
        );
    }

    // maps a list of reimbursement entities and return DTOs
    public List<ReimbursementDTO> toDTOList(List<Reimbursement> reimbursements) {
        return reimbursements.stream()
                .map(this::toDTO)
                .collect(java.util.stream.Collectors.toList());
    }

}
