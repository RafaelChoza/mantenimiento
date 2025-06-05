package com.mantenimiento.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mantenimiento.dto.MantenimientoCompletado;

public interface ManttoCompletadoRepositorio extends JpaRepository<MantenimientoCompletado, Long> {

}
