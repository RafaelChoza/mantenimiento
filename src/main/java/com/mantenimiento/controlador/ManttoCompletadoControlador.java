package com.mantenimiento.controlador;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mantenimiento.dto.MantenimientoCompletado;
import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.servicio.ManttoCompletadoServicio;

@RestController
public class ManttoCompletadoControlador {

    @Autowired
    ManttoCompletadoServicio manttoCompletadoServicio;

    @GetMapping("/mantenimiento-completado")
    public ResponseWrapper<Page<MantenimientoCompletado>> obtenerManttosCompletados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MantenimientoCompletado> listaManttosCompletados = manttoCompletadoServicio
                .obtenerListaCompletados(pageable);

        ResponseEntity<Page<MantenimientoCompletado>> responseEntity = ResponseEntity.ok(listaManttosCompletados);
        return new ResponseWrapper<>(true, "Lista de mantenimientos completados paginados", responseEntity);
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

    @GetMapping("/mantenimiento-completado/filtrar")
    public ResponseWrapper<Page<MantenimientoCompletado>> filtrarMantenimientoCompletado(
            @RequestParam(required = false) String requestorName,
            @RequestParam(required = false) String requestorLastName,
            @RequestParam(required = false) String area,
            @RequestParam(required = false) String idMachine,
            @RequestParam(required = false) String serviceDateTime, // corregido el nombre del parámetro
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
                
        Pageable pageable = PageRequest.of(page, size);

        System.out.println("Se recibe parametro: " + requestorName);
        System.out.println("Se recibe parametro: " + requestorLastName);
        System.out.println("Se recibe parametro: " + area);
        System.out.println("Se recibe parametro: " + idMachine);
        System.out.println("Se recibe parametro: " + serviceDateTime);
        System.out.println("Se recibe parametro: " + page);
        System.out.println("Se recibe parametro: " + size);


        Page<MantenimientoCompletado> resultados = manttoCompletadoServicio.obtenerListaPorFiltro(requestorName, requestorLastName, area,
                idMachine, serviceDateTime, pageable);

        return new ResponseWrapper<>(
                true,
                "Filtrado exitoso",
                ResponseEntity.ok(resultados));
    }

}