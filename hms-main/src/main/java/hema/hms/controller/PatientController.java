package hema.hms.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import hema.hms.dto.PatientRequestDTO;
import hema.hms.dto.PatientResponseDTO;
import hema.hms.service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public String createPatient(@Valid @RequestBody PatientRequestDTO request) {

        patientService.createPatient(request);

        return "Patient created successfully";
    }

    @GetMapping
    public List<PatientResponseDTO> getAllPatients() {

        return patientService.getAllPatients();
    }

    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {

        patientService.deletePatient(id);

        return "Patient deleted successfully";
    }
}