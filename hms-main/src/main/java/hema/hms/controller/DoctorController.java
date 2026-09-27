package hema.hms.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import hema.hms.dto.DoctorRequestDTO;
import hema.hms.dto.DoctorResponseDTO;
import hema.hms.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public String createDoctor(@Valid @RequestBody DoctorRequestDTO request) {

        doctorService.createDoctor(request);

        return "Doctor created successfully";
    }

    @GetMapping
    public List<DoctorResponseDTO> getAllDoctors() {

        return doctorService.getAllDoctors();
    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return "Doctor deleted successfully";
    }
}