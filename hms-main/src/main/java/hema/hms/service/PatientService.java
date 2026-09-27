package hema.hms.service;

import hema.hms.dto.PatientRequestDTO;
import hema.hms.dto.PatientResponseDTO;

import java.util.List;

public interface PatientService {

    void createPatient(PatientRequestDTO request);

    List<PatientResponseDTO> getAllPatients();

    void deletePatient(Long id);
}