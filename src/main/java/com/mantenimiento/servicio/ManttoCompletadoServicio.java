package com.mantenimiento.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mantenimiento.dto.MantenimientoCompletado;
import com.mantenimiento.dto.MantenimientoOrden;
import com.mantenimiento.repositorio.MantenimientoRepositorio;
import com.mantenimiento.repositorio.ManttoCompletadoRepositorio;

import jakarta.transaction.Transactional;

@Service
public class ManttoCompletadoServicio {

    @Autowired
    MantenimientoRepositorio mantenimientoRepositorio;

    @Autowired
    ManttoCompletadoRepositorio manttoCompletadoRepositorio;

    @Transactional
    public void completarOrden(Long id) {
        MantenimientoOrden orden = mantenimientoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden con el id " + id + " no encontrada"));

        MantenimientoCompletado completado = new MantenimientoCompletado();

        completado.setId(orden.getId());
        completado.setServiceDateTime(orden.getServiceDateTime());
        completado.setServiceTime(orden.getServiceTime());
        completado.setRequestorName(orden.getRequestorName());
        completado.setRequestorLastName(orden.getRequestorLastName());
        completado.setArea(orden.getArea());
        completado.setIdMachine(orden.getIdMachine());
        completado.setStoppedMachine(orden.isStoppedMachine());
        completado.setAttentionRequired(orden.isAttentionRequired());
        completado.setServiceDescription(orden.getServiceDescription());
        completado.setReceptionDate(orden.getReceptionDate());
        completado.setReceptionTime(orden.getReceptionTime());
        completado.setPersonnelAssigned(orden.getPersonnelAssigned());
        completado.setProgrammedDate(orden.getProgrammedDate());
        completado.setObservations(orden.getObservations());
        completado.setProblemCauseSolution(orden.getProblemCauseSolution());
        completado.setEquipmentDisposal(orden.isEquipmentDisposal());
        completado.setNotificateCalibration(orden.isNotificateCalibration());
        completado.setUsedParts(orden.getUsedParts());
        completado.setPartNumber(orden.getPartNumber());
        completado.setDescriptionPart(orden.getDescriptionPart());
        completado.setPartOrigin(orden.getPartOrigin());
        completado.setCoversInstalled(orden.isCoversInstalled());
        completado.setInterlocksTested(orden.isInterlocksTested());
        completado.setGuardsInstalled(orden.isGuardsInstalled());
        completado.setElectricityConnected(orden.isElectricityConnected());
        completado.setCompleteRevision(orden.isCompleteRevision());
        completado.setCleanArea(orden.isCleanArea());
        completado.setWaterAirGasConnected(orden.isWaterAirGasConnected());
        completado.setTaggedProperly(orden.isTaggedProperly());
        completado.setComments(orden.getComments());
        completado.setCloseDate(orden.getCloseDate());

        manttoCompletadoRepositorio.save(completado);
        mantenimientoRepositorio.delete(orden);
    }

    public List<MantenimientoCompletado> obtenerListaCompletados() {
        return manttoCompletadoRepositorio.findAll();
    }

    public Optional<MantenimientoCompletado> obtenerManttoCompletadoPorId (Long id) {
        return manttoCompletadoRepositorio.findById(id);
    }
}
