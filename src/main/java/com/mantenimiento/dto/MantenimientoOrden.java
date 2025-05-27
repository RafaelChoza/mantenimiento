package com.mantenimiento.dto;

import java.sql.Date;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mantenimiento_orden")
public class MantenimientoOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
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

    public String getProblemCauseSolution() {
        return problemCauseSolution;
    }

    public void setProblemCauseSolution(String problemCauseSolution) {
        this.problemCauseSolution = problemCauseSolution;
    }

    public boolean isWaterAirGasConnected() {
        return waterAirGasConnected;
    }

    public void setWaterAirGasConnected(boolean waterAirGasConnected) {
        this.waterAirGasConnected = waterAirGasConnected;
    }

    public boolean isTaggedProperly() {
        return taggedProperly;
    }

    public void setTaggedProperly(boolean taggedProperly) {
        this.taggedProperly = taggedProperly;
    }

    public String getPersonnelAssigned() {
        return personnelAssigned;
    }

    public void setPersonnelAssigned(String personnelAssigned) {
        this.personnelAssigned = personnelAssigned;
    }

    public Long getUsedParts() {
        return usedParts;
    }

    public void setUsedParts(Long usedParts) {
        this.usedParts = usedParts;
    }

    public boolean isGuardsInstalled() {
        return guardsInstalled;
    }

    public void setGuardsInstalled(boolean guardsInstalled) {
        this.guardsInstalled = guardsInstalled;
    }

    public boolean isCompleteRevision() {
        return completeRevision;
    }

    public void setCompleteRevision(boolean completeRevision) {
        this.completeRevision = completeRevision;
    }

    public boolean isCleanArea() {
        return cleanArea;
    }

    public void setCleanArea(boolean cleanArea) {
        this.cleanArea = cleanArea;
    }

    public String getServiceDateTime() {
        return serviceDateTime;
    }

    public void setServiceDateTime(String serviceDateTime) {
        this.serviceDateTime = serviceDateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceTime() {
        return serviceTime;
    }

    public void setServiceTime(String serviceTime) {
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

    public LocalTime getReceptionTime() {
        return receptionTime;
    }

    public void setReceptionTime(LocalTime receptionTime) {
        this.receptionTime = receptionTime;
    }

    public String getPersonnelAsigned() {
        return personnelAssigned;
    }

    public void setPersonnelAsigned(String personnelAsigned) {
        this.personnelAssigned = personnelAsigned;
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
        return usedParts;
    }

    public void setUsedPArts(Long usedPArts) {
        this.usedParts = usedPArts;
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
        return guardsInstalled;
    }

    public void setGardsInstalled(boolean gardsInstalled) {
        this.guardsInstalled = gardsInstalled;
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

    @Override
    public String toString() {
        return "MantenimientoOrden [id=" + id + ", serviceDateTime=" + serviceDateTime + ", serviceTime=" + serviceTime
                + ", requestorName=" + requestorName + ", requestorLastName=" + requestorLastName + ", area=" + area
                + ", idMachine=" + idMachine + ", stoppedMachine=" + stoppedMachine + ", attentionRequired="
                + attentionRequired + ", serviceDescription=" + serviceDescription + ", receptionDate=" + receptionDate
                + ", receptionTime=" + receptionTime + ", personnelAssigned=" + personnelAssigned + ", programmedDate="
                + programmedDate + ", observations=" + observations + ", equipmentDisposal=" + equipmentDisposal + ", notificateCalibration=" + notificateCalibration
                + ", usedParts=" + usedParts + ", partNumber=" + partNumber + ", descriptionPart=" + descriptionPart
                + ", partOrigin=" + partOrigin + ", coversInstalled=" + coversInstalled + ", interlocksTested="
                + interlocksTested + ", guardsInstalled=" + guardsInstalled + ", electricityConnected="
                + electricityConnected + ", completeRevision=" + completeRevision + ", cleanArea=" + cleanArea
                + ", waterAirGasConnected=" + waterAirGasConnected + ", taggedProperly=" + taggedProperly
                + ", comments=" + comments + ", closeDate=" + closeDate + ", isWaterAirGasConnected()="
                + isWaterAirGasConnected() + ", isTaggedProperly()=" + isTaggedProperly() + ", getPersonnelAssigned()="
                + getPersonnelAssigned() + ", getUsedParts()=" + getUsedParts() + ", isGuardsInstalled()="
                + isGuardsInstalled() + ", isCompleteRevision()=" + isCompleteRevision() + ", isCleanArea()="
                + isCleanArea() + ", getServiceDateTime()=" + getServiceDateTime() + ", getId()=" + getId()
                + ", getServiceTime()=" + getServiceTime() + ", getRequestorName()=" + getRequestorName()
                + ", getRequestorLastName()=" + getRequestorLastName() + ", getArea()=" + getArea()
                + ", getIdMachine()=" + getIdMachine() + ", isStoppedMachine()=" + isStoppedMachine()
                + ", isAttentionRequired()=" + isAttentionRequired() + ", getServiceDescription()="
                + getServiceDescription() + ", getReceptionDate()=" + getReceptionDate() + ", getReceptionTime()="
                + getReceptionTime() + ", getPersonnelAsigned()=" + getPersonnelAsigned() + ", getProgrammedDate()="
                + getProgrammedDate() + ", getObservations()=" + getObservations() + ", isEquipmentDisposal()=" + isEquipmentDisposal()
                + ", isNotificateCalibration()=" + isNotificateCalibration() + ", getUsedPArts()=" + getUsedPArts()
                + ", getPartNumber()=" + getPartNumber() + ", getDescriptionPart()=" + getDescriptionPart()
                + ", getPartOrigin()=" + getPartOrigin() + ", isCoversInstalled()=" + isCoversInstalled()
                + ", isInterlocksTested()=" + isInterlocksTested() + ", isGardsInstalled()=" + isGardsInstalled()
                + ", isElectricityConnected()=" + isElectricityConnected() + ", getComments()=" + getComments()
                + ", getCloseDate()=" + getCloseDate() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
                + ", toString()=" + super.toString() + "]";
    }
}
