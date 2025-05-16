package com.mantenimiento.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mantenimiento.dto.Tecnico;
import com.mantenimiento.repositorio.TecnicoRepositorio;

@Service
public class TecnicoServicio {

    @Autowired
    TecnicoRepositorio tecnicoRepositorio;

    public List<Tecnico> obtenerTodosLosTecnicos() {
        return tecnicoRepositorio.findAll();
    }

    public Tecnico crearTecnico(Tecnico tecnico) {
    boolean existe = tecnicoRepositorio.existsByNumNomina(tecnico.getNumNomina());
    System.out.println("¿El número de nómina ya existe? " + existe);

    if (existe) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El número de nómina ya existe");
    }

    return tecnicoRepositorio.save(tecnico);
}


    public Optional<Tecnico> obtenerTecnicoPorId(Long id) {
        return tecnicoRepositorio.findById(id);
    }

    public Tecnico actualizarTecnico(Tecnico tecnicoActualizado) {
        return tecnicoRepositorio.save(tecnicoActualizado);
    }

    public void eliminarTecnico(Long id) {
        tecnicoRepositorio.deleteById(id);
    }
}
