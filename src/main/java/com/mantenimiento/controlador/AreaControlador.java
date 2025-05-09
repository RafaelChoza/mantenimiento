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

import com.mantenimiento.dto.Area;
import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.servicio.AreaServicio;

@RestController
public class AreaControlador {

    @Autowired
    AreaServicio areaServicio;

    @GetMapping("/areas")
    public ResponseWrapper<List<Area>> obtenerTodasAreas() {
        System.out.println("Obteniendo todas las areas...");
        List<Area> listaAreas = areaServicio.obtenerAreas();
        ResponseEntity<List<Area>> responseEntity = ResponseEntity.ok(listaAreas);

        return new ResponseWrapper<>(true, "AreasObtenidas", responseEntity);
    }

    @GetMapping("/areas/{id}")
    public ResponseWrapper<Area> obtenerAreaPorId(@PathVariable Long id) {
        System.out.println("Obteniendo area por el id: " + id);
        Optional<Area> areaOptional = areaServicio.obtenerAreaPorId(id);
        if(areaOptional.isPresent()) {
            ResponseEntity<Area> responseEntity = ResponseEntity.ok().build();
            return new ResponseWrapper<> (true, "Area con el id fue obtenida", responseEntity);
        } else {
            ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "No existe area con ese id", null);
        }

    }

    @PostMapping("/areas")
    public ResponseWrapper<Area> crearArea(@RequestBody Area area) {
        try {
            Area areaCreada = areaServicio.crearArea(area);
            ResponseEntity<Area> responseEntity = ResponseEntity.ok(areaCreada);
            return new ResponseWrapper<> (true, "Area creada con exito", responseEntity);
        } catch (Exception e) {
            ResponseEntity<Area> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Error al crear el Area", responseEntity);
        }
    }

    @PutMapping("areas/{id}")
    public ResponseWrapper<Area> actualizarArea(@PathVariable Long id, @RequestBody Area area) {
        System.out.println("Area obtenida con el id:" + id);
        System.out.println("Nombre del area obtenida: " + area);
        Optional<Area> areaOptional = areaServicio.obtenerAreaPorId(id);
    
        if(areaOptional.isPresent()) {
            area.setId(areaOptional.get().getId());
            areaServicio.actualziarArea(area);

            ResponseEntity<Area> responseEntity = ResponseEntity.ok(area);
            return new ResponseWrapper<>(true, "Area actualizada con exito", responseEntity);
        } else {
            ResponseEntity<Area> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "No existe el area con ese Id", responseEntity);       
        }
    }

    @DeleteMapping("/areas/{id}")
    public ResponseWrapper<Void> eliminarArea(@PathVariable Long id) {
        System.out.println("Area a eliminar con el id: " + id);
        try {
            areaServicio.eliminarArea(id);
            ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
            return new ResponseWrapper<>(true, "Area eliminada con exito", responseEntity);
        } catch (Exception e) {
            ResponseEntity<Void> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Area con ese id no existe" + e.getMessage(), responseEntity);
        }
    }
 }
