package com.mantenimiento.repositorio;

import com.mantenimiento.dto.MantenimientoCompletado;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ManttoCompletadoRepositorio extends JpaRepository<MantenimientoCompletado, Long> {

    @Query("SELECT m FROM MantenimientoCompletado m " +
           "WHERE (:requestorName IS NULL OR m.requestorName LIKE %:requestorName%) " +
           "AND (:requestorLastName IS NULL OR m.requestorLastName LIKE %:requestorLastName%)" +
           "AND (:area IS NULL OR m.area LIKE %:area%) " +
           "AND (:idMachine IS NULL OR m.idMachine LIKE %:idMachine%) " +
           "AND (:serviceDateTime IS NULL OR m.serviceDateTime LIKE %:serviceDateTime%)")
    Page<MantenimientoCompletado> filtrarMantenimientos(
        @Param("requestorName") String requestorName,
        @Param("requestorLastName") String requestorLastName,
        @Param("area") String area,
        @Param("idMachine") String idMachine,
        @Param("serviceDateTime") String serviceDateTime,
        Pageable pageable
    );
}
