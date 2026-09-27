package hema.hms.service;

import hema.hms.dto.DoctorRequestDTO;
import hema.hms.dto.DoctorResponseDTO;

import java.util.List;

public interface DoctorService {

    void createDoctor(DoctorRequestDTO request);

    List<DoctorResponseDTO> getAllDoctors();

    void deleteDoctor(Long id);
}