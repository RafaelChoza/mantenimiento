package com.mantenimiento.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mantenimiento.dto.Area;
import com.mantenimiento.repositorio.AreaRepositorio;

@Service
public class AreaServicio {

    @Autowired
    AreaRepositorio areaRepositorio;

    public Area crearArea(Area area) {
        return areaRepositorio.save(area);
    }

    public List<Area> obtenerAreas() {
        return areaRepositorio.findAll();
    }

    public Optional<Area> obtenerAreaPorId(Long id) {
        return areaRepositorio.findById(id);
    }

    public Area actualziarArea(Area area) {
        return areaRepositorio.save(area);
    }

    public void eliminarArea(Long id) {
        areaRepositorio.deleteById(id);
    }
}
