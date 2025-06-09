package com.mantenimiento.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mantenimiento.dto.Maquina;

public interface MaquinaRepositorio extends JpaRepository<Maquina, Long> {

}
