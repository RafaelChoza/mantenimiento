package com.mantenimiento.dto;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.TimeZone;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "mantenimiento_orden")
public class MantenimientoOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime serviceDateTime = LocalDateTime.now();
    private TimeZone serviceTime = TimeZone.getDefault();
    private String requestorName;
    private String requestorLastName;
    private String area;
    private String idMachine;
    private boolean stoppedMachine;
    private boolean attentionRequired;
    private String serviceDescription;

    private Date receptionDate;
    private TimeZone receptionTime;
    private String personnelAsigned;
    private String programmedDate;
    private String observations;

    private String serviceSolution;
    private boolean equipmentDisposal;
    private boolean notificateCalibration;

    private Long usedPArts;
    private String partNumber;
    private String descriptionPart;
    private String partOrigin;

    private boolean coversInstalled;
    private boolean interlocksTested;
    private boolean gardsInstalled;
    private boolean electricityConnected;
    private String comments;
    private Date closeDate;

     @PrePersist
    protected void onCreate() {
        serviceDateTime = LocalDateTime.now();
    }

    public LocalDateTime getServiceDateTime() {
        return serviceDateTime;
    }

    public void setServiceDateTime(LocalDateTime serviceDateTime) {
        this.serviceDateTime = serviceDateTime;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TimeZone getServiceTime() {
        return serviceTime;
    }

    public void setServiceTime(TimeZone serviceTime) {
        this.serviceTime = serviceTime;
    }

    public String getRequestorName() {
        return requestorName;
    }

    public void setRequestorName(String requestorName) {
        this.requestorName = requestorName;
    }

    public String getRequestorLastName() {
        return requestorLastName;
    }

    public void setRequestorLastName(String requestorLastName) {
        this.requestorLastName = requestorLastName;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getIdMachine() {
        return idMachine;
    }

    public void setIdMachine(String idMachine) {
        this.idMachine = idMachine;
    }

    public boolean isStoppedMachine() {
        return stoppedMachine;
    }

    public void setStoppedMachine(boolean stoppedMachine) {
        this.stoppedMachine = stoppedMachine;
    }

    public boolean isAttentionRequired() {
        return attentionRequired;
    }

    public void setAttentionRequired(boolean attentionRequired) {
        this.attentionRequired = attentionRequired;
    }

    public String getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }

    public Date getReceptionDate() {
        return receptionDate;
    }

    public void setReceptionDate(Date receptionDate) {
        this.receptionDate = receptionDate;
    }

    public TimeZone getReceptionTime() {
        return receptionTime;
    }

    public void setReceptionTime(TimeZone receptionTime) {
        this.receptionTime = receptionTime;
    }

    public String getPersonnelAsigned() {
        return personnelAsigned;
    }

    public void setPersonnelAsigned(String personnelAsigned) {
        this.personnelAsigned = personnelAsigned;
    }

    public String getProgrammedDate() {
        return programmedDate;
    }

    public void setProgrammedDate(String programmedDate) {
        this.programmedDate = programmedDate;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public String getServiceSolution() {
        return serviceSolution;
    }

    public void setServiceSolution(String serviceSolution) {
        this.serviceSolution = serviceSolution;
    }

    public boolean isEquipmentDisposal() {
        return equipmentDisposal;
    }

    public void setEquipmentDisposal(boolean equipmentDisposal) {
        this.equipmentDisposal = equipmentDisposal;
    }

    public boolean isNotificateCalibration() {
        return notificateCalibration;
    }

    public void setNotificateCalibration(boolean notificateCalibration) {
        this.notificateCalibration = notificateCalibration;
    }

    public Long getUsedPArts() {
        return usedPArts;
    }

    public void setUsedPArts(Long usedPArts) {
        this.usedPArts = usedPArts;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getDescriptionPart() {
        return descriptionPart;
    }

    public void setDescriptionPart(String descriptionPart) {
        this.descriptionPart = descriptionPart;
    }

    public String getPartOrigin() {
        return partOrigin;
    }

    public void setPartOrigin(String partOrigin) {
        this.partOrigin = partOrigin;
    }

    public boolean isCoversInstalled() {
        return coversInstalled;
    }

    public void setCoversInstalled(boolean coversInstalled) {
        this.coversInstalled = coversInstalled;
    }

    public boolean isInterlocksTested() {
        return interlocksTested;
    }

    public void setInterlocksTested(boolean interlocksTested) {
        this.interlocksTested = interlocksTested;
    }

    public boolean isGardsInstalled() {
        return gardsInstalled;
    }

    public void setGardsInstalled(boolean gardsInstalled) {
        this.gardsInstalled = gardsInstalled;
    }

    public boolean isElectricityConnected() {
        return electricityConnected;
    }

    public void setElectricityConnected(boolean electricityConnected) {
        this.electricityConnected = electricityConnected;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Date getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(Date closeDate) {
        this.closeDate = closeDate;
    }

}
