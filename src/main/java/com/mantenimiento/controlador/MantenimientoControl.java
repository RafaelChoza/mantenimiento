package com.mantenimiento.controlador;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mantenimiento.dto.MantenimientoOrden;
import com.mantenimiento.dto.ResponseWrapper;
import com.mantenimiento.servicio.MantenimientoServicio;
import com.mantenimiento.user.RolDTO;
import com.mantenimiento.user.Role;
import com.mantenimiento.user.User;
import com.mantenimiento.user.UserService;

@RestController
public class MantenimientoControl {

    @Autowired
    MantenimientoServicio mantenimientoServicio;

    @Autowired
    UserService userService;

    @GetMapping("/mantenimiento")
public ResponseWrapper<List<MantenimientoOrden>> obtenerMantenimientos(
        @RequestParam(required = false) String username) {

    List<MantenimientoOrden> listaDeMantenimientos;

    if (username != null && !username.isEmpty()) {
        listaDeMantenimientos = mantenimientoServicio.obtenerOrdenesPorUsername(username);
    } else {
        listaDeMantenimientos = mantenimientoServicio.obtenerTodasLasOrdenesMantenimiento();
    }

    ResponseEntity<List<MantenimientoOrden>> response = ResponseEntity.ok(listaDeMantenimientos);
    return new ResponseWrapper<>(true, "Listado de Mantenimientos", response);
}


    @GetMapping("/mantenimiento/{id}")
    public ResponseWrapper<MantenimientoOrden> obtenerOrdenPorId(@PathVariable Long id) {
        System.out.println("Id recibido: " + id);
        Optional<MantenimientoOrden> mantenimientoOptional = mantenimientoServicio.obtenerOrdenMantenimientoPorId(id);
        ResponseEntity<MantenimientoOrden> responseEntity = mantenimientoOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
        return new ResponseWrapper<>(true, "Informacion del servicio " + id, responseEntity);
    }

    @PostMapping("/mantenimiento")
    public ResponseWrapper<MantenimientoOrden> crearMantenimiento(@RequestBody MantenimientoOrden mantenimiento) {
        System.out.println("Orden de mantenimiento recibida: " + mantenimiento);
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
    public ResponseWrapper<MantenimientoOrden> actualizarMantenimiento(@PathVariable Long id,
            @RequestBody MantenimientoOrden mantenimiento) {
        System.out.println("Id recibido: " + id);
        System.out.println("Mantenimiento recibido: " + mantenimiento);
        Optional<MantenimientoOrden> mantenimientoOptional = mantenimientoServicio.obtenerOrdenMantenimientoPorId(id);

        if (mantenimientoOptional.isPresent()) {
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

    @GetMapping("mantenimiento/roles")
    public List<RolDTO> getRoles() {
        return Arrays.asList(Role.values()).stream()
                .map(role -> RolDTO.builder()
                        .id(role.getId())
                        .name(role.name())
                        .build())
                .collect(Collectors.toList());
    }

    @PutMapping("/mantenimiento/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable int id, @RequestBody Map<String, String> roleMap) {
        try {
            String newRole = roleMap.get("role");
            // Buscar al usuario por id y actualizar su rol
            Optional<User> userOptional = userService.findById(id);
            if (!userOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            User user = userOptional.get();
            // Validar que el nuevo rol sea válido
            Role role = Role.valueOf(newRole);
            user.setRole(role);
            userService.saveUser(user);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Rol no válido");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
