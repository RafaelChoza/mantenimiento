package com.mantenimiento.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mantenimiento_completado")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MantenimientoCompletado {

    @Id
    private Long id;
    private String serviceDateTime;
    private String serviceTime;
    private String requestorName;
    private String requestorLastName;
    private String area;
    private String idMachine;
    private boolean stoppedMachine;
    private boolean attentionRequired;
    private String serviceDescription;

    private Date receptionDate;
    @Column(name = "reception_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime receptionTime;
    private String personnelAssigned;
    private String programmedDate;
    private String observations;

    private String problemCauseSolution;
    private boolean equipmentDisposal;
    private boolean notificateCalibration;

    private Long usedParts;
    private String partNumber;
    private String descriptionPart;
    private String partOrigin;

    private boolean coversInstalled;
    private boolean interlocksTested;
    private boolean guardsInstalled;
    private boolean electricityConnected;
    private boolean completeRevision;
    private boolean cleanArea;
    private boolean waterAirGasConnected;
    private boolean taggedProperly;
    private String comments;
    private Date closeDate;

    private LocalDate fechaTransferencia;

    @PrePersist
    protected void onCreate() {
        this.fechaTransferencia = LocalDate.now();
    }

}
