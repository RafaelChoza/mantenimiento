package com.mantenimiento.controlador;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.dto.Tecnico;
import com.mantenimiento.servicio.TecnicoServicio;

@RestController
public class TecnicoControl {

    @Autowired
    TecnicoServicio tecnicoServicio;

    @GetMapping("/tecnicos")
    public ResponseWrapper<List<Tecnico>> obtenerTodosTecnicos() {
        System.out.println("Obteniendo todos los técnicos...");
        List<Tecnico> tecnicos = tecnicoServicio.obtenerTodosLosTecnicos();
        ResponseEntity<List<Tecnico>> responseEntity = ResponseEntity.ok(tecnicos);
        return new ResponseWrapper<>(false, "Lista de los tecnicos", responseEntity);
    }

    @GetMapping("tecnicos/{id}")
    public ResponseWrapper<Tecnico> obtenerTecnicoPotId(@PathVariable Long id) {
        System.out.println("Obteniendo técnico por ID: " + id);
        Optional<Tecnico> tecnico = tecnicoServicio.obtenerTecnicoPorId(id);
        ResponseEntity<Tecnico> responseEntity = tecnico.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
        return new ResponseWrapper<>(false, "Tecnico con ID: " + id, responseEntity);
    }

    @PostMapping("/tecnicos")
    public ResponseWrapper<Tecnico> crearTecnico(@RequestBody Tecnico tecnico) {
        System.out.println("Datos del técnico recibidos: " + tecnico);
        try {
            Tecnico tecnicoCreado = tecnicoServicio.crearTecnico(tecnico);
            ResponseEntity<Tecnico> responseEntity = ResponseEntity.ok(tecnicoCreado);
            return new ResponseWrapper<>(true, "Técnico creado con éxito", responseEntity);
        } catch (ResponseStatusException e) {
            System.out.println("Excepción capturada en el controlador: " + e.getReason());
            ResponseEntity<Tecnico> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, e.getReason(), responseEntity);
        }
    }

    @PutMapping("/tecnicos/{id}")
public ResponseWrapper<Tecnico> actualizarTecnico(@PathVariable Long id, @RequestBody Tecnico tecnico) {
    try {
        System.out.println("Id recibido: " + id);
        System.out.println("Técnico recibido: " + tecnico);

        Optional<Tecnico> tecnicoOptional = tecnicoServicio.obtenerTecnicoPorId(id);

        if (tecnicoOptional.isPresent()) {
            tecnico.setIdTecnico(tecnicoOptional.get().getIdTecnico());
            tecnicoServicio.actualizarTecnico(tecnico);
            ResponseEntity<Tecnico> responseEntity = ResponseEntity.ok(tecnico);
            return new ResponseWrapper<>(true, "Técnico actualizado con éxito", responseEntity);
        } else {
            ResponseEntity<Tecnico> responseEntity = ResponseEntity.notFound().build();
            return new ResponseWrapper<>(false, "Técnico no encontrado", responseEntity);
        }

    } catch (ResponseStatusException e) {
        e.printStackTrace(); // Opcional: útil durante desarrollo
        ResponseEntity<Tecnico> responseEntity = ResponseEntity.badRequest().build();
        return new ResponseWrapper<>(false,  e.getReason(), responseEntity);
    }
}


    @DeleteMapping("/tecnicos/{id}")
    public ResponseWrapper<Void> eliminarTecnico(@PathVariable Long id) {
        try {
            tecnicoServicio.eliminarTecnico(id);
            System.out.println("Tecnico Eliminado correctamente");
            ResponseEntity<Void> response = ResponseEntity.noContent().build();
            return new ResponseWrapper<>(true, "Tecnico eliminado con éxito", response);
        } catch (Exception e) {
            ResponseEntity<Void> response = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Error al eliminar el tecnico: " + e.getMessage(), response);
        }
    }
}
