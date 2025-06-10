package com.mantenimiento.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mantenimiento.dto.Maquina;
import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.servicio.MaquinaServicio;

@RestController
public class MaquinaControlador {

    @Autowired
    MaquinaServicio maquinaServicio;

    @GetMapping("/maquinas")
    public ResponseWrapper<Page<Maquina>> obtenerListaMaquinas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        System.out.println("Obteniendo lista de maquinas");

        Pageable pageable = PageRequest.of(page, size);

        Page<Maquina> listaMaquinas = maquinaServicio.getAllMachines(pageable);

        ResponseEntity<Page<Maquina>> responseEntity = ResponseEntity.ok(listaMaquinas);
        return new ResponseWrapper<>(true, "Lista de maquinas obtenido", responseEntity);
    }

    @GetMapping("/maquinas/todas")
    public ResponseWrapper<List<Maquina>> obtenerListaMaquinas() {
        System.out.println("Obteniendo lista de maquinas");

        List<Maquina> listaMaquinas = maquinaServicio.getAllMachinesNoPage();

        ResponseEntity<List<Maquina>> responseEntity = ResponseEntity.ok(listaMaquinas);
        return new ResponseWrapper<>(true, "Lista de maquinas obtenido", responseEntity);
    }

    @GetMapping("/maquinas/{id}")
    public ResponseWrapper<Optional<Maquina>> obtenerMaquinaPorId(@PathVariable Long id) {
        System.out.println("Maquina obtenida con el id: " + id);
        Optional<Maquina> maquOptional = maquinaServicio.getMachineById(id);
        if (!maquOptional.isPresent()) {
            ResponseEntity<Optional<Maquina>> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Maquina con ese id no encontrada", responseEntity);
        }
        ResponseEntity<Optional<Maquina>> responseEntity = ResponseEntity.ok(maquOptional);

        return new ResponseWrapper<>(true, "Maquina encontrada", responseEntity);
    }

    @PostMapping("/maquinas")
    public ResponseWrapper<Maquina> crearMaquina(@RequestBody Maquina maquina) {
        System.out.println("Datos obtenidos de maquina: " + maquina);
        try {
            Maquina maquinaCreada = maquinaServicio.createMachine(maquina);
            ResponseEntity<Maquina> responseEntity = ResponseEntity.ok(maquinaCreada);
            return new ResponseWrapper<>(true, "Maquina creada con exito", responseEntity);
        } catch (Exception e) {
            ResponseEntity<Maquina> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Error al crear la maquina", responseEntity);
        }
    }

    @PostMapping("/maquinas/{id}")
    public ResponseWrapper<Maquina> actualizarMaquina(@RequestParam Long id, @RequestBody Maquina maquina) {
        System.out.println("Maquina a editar recibida: " + maquina + " con ID " + id);
        try {
            Optional<Maquina> maqOptional = maquinaServicio.getMachineById(id);
            if (maqOptional.isPresent()) {
                maquina.setId(maqOptional.get().getId());
                maquinaServicio.updateMachine(maquina);
                ResponseEntity<Maquina> responseEntity = ResponseEntity.ok(maquina);
                return new ResponseWrapper<>(true, "Maquina actualizada con exito", responseEntity);
            } else {
                ResponseEntity<Maquina> responseEntity = ResponseEntity.notFound().build();
                return new ResponseWrapper<>(false, "No se encuentra maquina con ese ID", responseEntity);
            }
        } catch (Exception e) {
            ResponseEntity<Maquina> responseEntity = ResponseEntity.badRequest().build();
            return new ResponseWrapper<>(false, "Error al actualizar la maquina", responseEntity);
        }
    }

    @DeleteMapping("/maquinas/{id}")
    public ResponseWrapper<Void> borrarMaquina(@PathVariable Long id) {
        maquinaServicio.deleteMachine(id);
        ResponseEntity<Void> responseEntity = ResponseEntity.ok().build();
        return new ResponseWrapper<>(true, "Exito al borrar la maquina", responseEntity);
    }
}
