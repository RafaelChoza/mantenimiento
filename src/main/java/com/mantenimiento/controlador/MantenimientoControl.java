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

import com.mantenimiento.dto.MantenimientoOrden;
import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.servicio.MantenimientoServicio;

@RestController
public class MantenimientoControl {

    @Autowired
    MantenimientoServicio mantenimientoServicio;

    @GetMapping("/mantenimiento")
    public ResponseWrapper<List<MantenimientoOrden>> obtenerTodosMantenimientos() {
        System.out.println("Obteniendo todos los mantenimientos...");
        List<MantenimientoOrden> listaDeMantenimientos = mantenimientoServicio.obtenerTodasLasOrdenesMantenimiento();
        ResponseEntity<List<MantenimientoOrden>> response = ResponseEntity.ok(listaDeMantenimientos);
        return new ResponseWrapper<>(true, "Listado de Mantenimientos", response);
    }

    @GetMapping("/mantenimiento/{id}")
    public ResponseWrapper<MantenimientoOrden> obtenerOrdenPorId(@PathVariable Long id) {
        System.out.println("Id recibido: " + id);
        Optional<MantenimientoOrden> mantenimientoOptional = mantenimientoServicio.obtenerOrdenMantenimientoPorId(id);
        ResponseEntity<MantenimientoOrden> responseEntity =
                mantenimientoOptional.map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.notFound().build());
        return new ResponseWrapper<>(true, "Informacion del servicio " + id, responseEntity);
    }

    @PostMapping("/mantenimiento")
    public ResponseWrapper<MantenimientoOrden> crearMantenimiento(@RequestBody MantenimientoOrden mantenimiento) {
        try {
            MantenimientoOrden mantneimientoCreado = mantenimientoServicio.crearOrdenMantenimiento(mantenimiento);
            ResponseEntity<MantenimientoOrden> response = ResponseEntity.ok(mantneimientoCreado);
            return new ResponseWrapper<>(true, "Mantenimiento creado con éxito", response);
        } catch (Exception e) {
            ResponseEntity<MantenimientoOrden> response = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Error al crear el mantenimiento: " + e.getMessage(), response);
        }
    }

    @PutMapping("/mantenimiento/{id}")
    public ResponseWrapper<MantenimientoOrden> actualizarMantenimiento(@PathVariable Long id, @RequestBody MantenimientoOrden mantenimiento) {
        System.out.println("Id recibido: " + id);
        System.out.println("Mantenimiento recibido: " + mantenimiento);
        Optional<MantenimientoOrden> mantenimientoOptional = mantenimientoServicio.obtenerOrdenMantenimientoPorId(id);

        if(mantenimientoOptional.isPresent()) {
            mantenimiento.setId(mantenimientoOptional.get().getId());
            mantenimientoServicio.actualizarOrdenMantenimiento(mantenimiento);

            ResponseEntity<MantenimientoOrden> response = ResponseEntity.ok(mantenimiento);
            return new ResponseWrapper<>(true, "Mantenimiento actualizado con éxito", response);
        } else {
            ResponseEntity<MantenimientoOrden> response = ResponseEntity.notFound().build();
            return new ResponseWrapper<>(false, "No se encontró el mantenimiento con ese Id", response);
        }
    }

    @DeleteMapping("/mantenimiento/{id}")
    public ResponseWrapper<Void> eliminarMantenimiento(@PathVariable Long id) {
        try {
            mantenimientoServicio.eliminarOrdenMantenimiento(id);
            ResponseEntity<Void> response = ResponseEntity.noContent().build();
            return new ResponseWrapper<>(true, "Mantenimiento eliminado con éxito", response);
        } catch (Exception e) {
            ResponseEntity<Void> response = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Error al eliminar el mantenimiento: " + e.getMessage(), response);
        }
    }

}
