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
    boolean existNumNomina = tecnicoRepositorio.existsByNumNomina(tecnico.getNumNomina());
    boolean existCorreo = tecnicoRepositorio.existsByCorreo(tecnico.getCorreo());
    System.out.println("¿El número de nómina ya existe? " + existNumNomina);

    if (existNumNomina) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El número de nómina " + tecnico.getNumNomina() + " ya existe, no pueden duplicarse, verifique que sea el correcto");
    }

    if (existCorreo) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El correo " + tecnico.getCorreo() + " ya existe en la base de datos");
    }

    return tecnicoRepositorio.save(tecnico);
}


    public Optional<Tecnico> obtenerTecnicoPorId(Long id) {
        return tecnicoRepositorio.findById(id);
    }

    public Tecnico actualizarTecnico(Tecnico tecnicoActualizado) {
    Optional<Tecnico> existentePorNomina = tecnicoRepositorio.findByNumNomina(tecnicoActualizado.getNumNomina());
    if (existentePorNomina.isPresent() && !existentePorNomina.get().getIdTecnico().equals(tecnicoActualizado.getIdTecnico())) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El número de nomina " + tecnicoActualizado.getNumNomina() + " ya existe en la base de datos");
    }

    Optional<Tecnico> existentePorCorreo = tecnicoRepositorio.findByCorreo(tecnicoActualizado.getCorreo());
    if (existentePorCorreo.isPresent() && !existentePorCorreo.get().getIdTecnico().equals(tecnicoActualizado.getIdTecnico())) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El correo " + tecnicoActualizado.getCorreo() + " ya existe en la base de datos");
    }

    return tecnicoRepositorio.save(tecnicoActualizado);
}


    public void eliminarTecnico(Long id) {
        tecnicoRepositorio.deleteById(id);
    }
}
