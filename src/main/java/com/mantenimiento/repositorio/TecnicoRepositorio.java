package com.mantenimiento.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mantenimiento.dto.Tecnico;

public interface TecnicoRepositorio extends JpaRepository<Tecnico, Long> {
    boolean existsByNumNomina(Long numNomina);
    boolean existsByCorreo(String correo);
    Optional<Tecnico> findByNumNomina(Long numNomina);
    Optional<Tecnico> findByCorreo(String correo);
}
