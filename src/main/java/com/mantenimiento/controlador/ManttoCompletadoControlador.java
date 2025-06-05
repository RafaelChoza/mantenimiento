package com.mantenimiento.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mantenimiento.dto.MantenimientoCompletado;
import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.servicio.ManttoCompletadoServicio;

@RestController
public class ManttoCompletadoControlador {

    @Autowired
    ManttoCompletadoServicio manttoCompletadoServicio;

    @GetMapping("/mantenimiento-completado")
    public ResponseWrapper<List<MantenimientoCompletado>> obtenerManttosCompletados() {
        System.out.println("Obteniendo todos los mantenimientos completados");
        List<MantenimientoCompletado> listaManttosCompletados = manttoCompletadoServicio.obtenerListaCompletados();
        ResponseEntity<List<MantenimientoCompletado>> responseEntity = ResponseEntity.ok(listaManttosCompletados);

        return new ResponseWrapper<>(true, "Lista de mantenimientos completados obtenida", responseEntity);
    }

    @PostMapping("/mantenimiento/{id}/completado")
    public ResponseWrapper<Void> ordenComplatada(@PathVariable Long id) {
        System.out.println("Obteniendo orden con id: " + id);
        manttoCompletadoServicio.completarOrden(id);
        ResponseEntity<Void> responseEntity = ResponseEntity.ok().build();
        return new ResponseWrapper<>(true, "Orden completada", responseEntity);
    }

    @PostMapping("/mantenimiento/{id}")
    public ResponseWrapper<MantenimientoCompletado> tenerManttoCompletadoPorId(@PathVariable Long id) {
        System.out.println("Obteniendo mantenimiento completado con el id: " + id);

        Optional<MantenimientoCompletado> manttoCompletadoOptional = manttoCompletadoServicio
                .obtenerManttoCompletadoPorId(id);

        if (manttoCompletadoOptional.isPresent()) {
            ResponseEntity<MantenimientoCompletado> responseEntity = ResponseEntity.ok(manttoCompletadoOptional.get());
            return new ResponseWrapper<>(true, "Información del mantenimiento completado: " + id, responseEntity);
        } else {
            ResponseEntity<MantenimientoCompletado> responseEntity = ResponseEntity.notFound().build();
            return new ResponseWrapper<>(false, "No se encontró mantenimiento completado con el id: " + id,
                    responseEntity);
        }
    }

}