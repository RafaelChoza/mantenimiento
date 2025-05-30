package com.mantenimiento.repositorio;

import com.mantenimiento.dto.MantenimientoOrden;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MantenimientoRepositorio extends JpaRepository<MantenimientoOrden, Long> {

    List<MantenimientoOrden> findAllByUsername(String username);

}
