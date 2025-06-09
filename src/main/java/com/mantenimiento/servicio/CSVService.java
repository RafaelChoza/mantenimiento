package com.mantenimiento.servicio;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.mantenimiento.dto.Maquina;
import com.mantenimiento.repositorio.MaquinaRepositorio;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVService {

    private final MaquinaRepositorio maquinaRepositorio;

    public CSVService(MaquinaRepositorio maquinaRepositorio) {
        this.maquinaRepositorio = maquinaRepositorio;
    }

    public String saveCSV(MultipartFile file) {
        List<Maquina> maquinas = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            br.readLine(); // Saltar la primera línea (cabecera)
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) {
                    continue;
                }
                String[] values = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
                for (int i = 0; i < values.length; i++) {
                    values[i] = values[i].replaceAll("^\"|\"$", "");
                }
                System.out.println("Valores: " + java.util.Arrays.toString(values));
                if (values.length < 11) {
                    System.out.println("La línea no tiene suficientes valores: " + line);
                    continue;
                }
                Maquina maquina = new Maquina(
                    null, // ID se genera automáticamente
                    values[0], // Descripción
                    values[1], // Producto
                    values[2], // Marca
                    values[3], // Modelo
                    values[4], // Fecha de alta
                    values[5], // Código
                    values[6], // Tipo de equipo
                    values[7], // Clasificación 1
                    values[8], // Clasificación 2
                    values[9], // Centro
                    values[10] // Localización
                );
                maquinas.add(maquina);
            }
            maquinaRepositorio.saveAll(maquinas);
            return "Archivo procesado y datos guardados correctamente.";
        } catch (IOException e) {
            return "Error al procesar el archivo CSV: " + e.getMessage();
        }
    }
}