package com.mantenimiento.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mantenimiento.dto.MantenimientoOrden;
import com.mantenimiento.repositorio.MantenimientoRepositorio;

@Service
public class MantenimientoServicio {

    @Autowired
    MantenimientoRepositorio mantenimientoRepositorio;

    public MantenimientoOrden crearOrdenMantenimiento(MantenimientoOrden orden) {
        return mantenimientoRepositorio.save(orden);
    }

    public Optional<MantenimientoOrden> obtenerOrdenMantenimientoPorId(Long id) {
        return mantenimientoRepositorio.findById(id);
    }

    public List<MantenimientoOrden> obtenerTodasLasOrdenesMantenimiento() {
        return mantenimientoRepositorio.findAll();
    }

    public MantenimientoOrden actualizarOrdenMantenimiento(MantenimientoOrden ordenActualizada) {
        return mantenimientoRepositorio.save(ordenActualizada);
    }

    public void eliminarOrdenMantenimiento(Long id) {
        mantenimientoRepositorio.deleteById(id);
    }

    public List<MantenimientoOrden> obtenerOrdenesPorUsername(String username) {
        return mantenimientoRepositorio.findAllByUsername(username);
       
    }

    public List<MantenimientoOrden> obtenerOrdenesPorPersonalAsignado(String personnelAssigned) {
        return mantenimientoRepositorio.findByPersonnelAssigned(personnelAssigned);
    }
}
