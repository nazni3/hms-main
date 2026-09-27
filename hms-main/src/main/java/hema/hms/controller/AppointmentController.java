package hema.hms.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import hema.hms.dto.AppointmentRequestDTO;
import hema.hms.dto.AppointmentResponseDTO;
import hema.hms.dto.AppointmentStatusUpdateDTO;
import hema.hms.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public String createAppointment(
            @Valid @RequestBody AppointmentRequestDTO request
    ) {

        appointmentService.createAppointment(request);

        return "Appointment created successfully";
    }

    @GetMapping
    public List<AppointmentResponseDTO> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    @PutMapping("/{id}")
    public String updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody AppointmentStatusUpdateDTO request
    ) {

        appointmentService.updateAppointmentStatus(id, request);

        return "Appointment updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return "Appointment deleted successfully";
    }
}