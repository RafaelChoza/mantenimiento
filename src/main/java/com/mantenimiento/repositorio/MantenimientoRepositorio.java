package com.mantenimiento.repositorio;

import com.mantenimiento.dto.MantenimientoOrden;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MantenimientoRepositorio extends JpaRepository<MantenimientoOrden, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario

}
