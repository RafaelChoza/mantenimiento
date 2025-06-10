package com.mantenimiento.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "maquinas")
public class Maquina {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String descripcion;
    private String producto;
    private String marca;
    private String modelo;
    private String fechaAlta;
    private String idMachine;
    private String tipoDeEquipo;
    private String clasificacion1;
    private String clasificacion2;
    private String centro;
    private String localizacion;
}
