package com.mantenimiento.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mantenimiento.dto.Area;

public interface AreaRepositorio extends JpaRepository<Area, Long> {

}
