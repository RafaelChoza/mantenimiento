package com.mantenimiento.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mantenimiento.repositorio.MaquinaRepositorio;
import com.mantenimiento.dto.Maquina;

@Service
public class MaquinaServicio {

    @Autowired
    MaquinaRepositorio maquinaRepositorio;

    public Page<Maquina> getAllMachines(Pageable pageable) {
        return maquinaRepositorio.findAll(pageable);
    }

    public List<Maquina> getAllMachinesNoPage() {
        return maquinaRepositorio.findAll();
    }

    public Optional<Maquina> getMachineById(Long id) {
        return maquinaRepositorio.findById(id);
    }

    public Maquina createMachine(Maquina maquina) {
        return maquinaRepositorio.save(maquina);
    }

    public Maquina updateMachine(Maquina maquina) {
        return maquinaRepositorio.findById(maquina.getId())
                .map(existingMachine -> {
                    existingMachine.setCentro(maquina.getCentro());
                    existingMachine.setClasificacion1(maquina.getClasificacion1());
                    existingMachine.setClasificacion2(maquina.getClasificacion2());
                    existingMachine.setIdMachine(maquina.getIdMachine());
                    existingMachine.setDescripcion(maquina.getDescripcion());
                    existingMachine.setFechaAlta(maquina.getFechaAlta());
                    existingMachine.setLocalizacion(maquina.getLocalizacion());
                    existingMachine.setMarca(maquina.getMarca());
                    existingMachine.setModelo(maquina.getModelo());
                    existingMachine.setProducto(maquina.getProducto());
                    existingMachine.setTipoDeEquipo(maquina.getTipoDeEquipo());
                    return maquinaRepositorio.save(existingMachine);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "La maquina con el ID " + maquina.getId() + " no existe"));
    }

    public void deleteMachine(Long id) {
        maquinaRepositorio.deleteById(id);
    }
}
