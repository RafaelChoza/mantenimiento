package com.mantenimiento.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mantenimiento.dto.Tecnico;

public interface TecnicoRepositorio extends JpaRepository<Tecnico, Long> {
    boolean existsByNumNomina(Long numNomina);
}
