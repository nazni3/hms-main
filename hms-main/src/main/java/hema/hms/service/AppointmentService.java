package hema.hms.service;

import java.util.List;

import hema.hms.dto.AppointmentRequestDTO;
import hema.hms.dto.AppointmentResponseDTO;
import hema.hms.dto.AppointmentStatusUpdateDTO;

public interface AppointmentService {

    void createAppointment(AppointmentRequestDTO request);

    List<AppointmentResponseDTO> getAllAppointments();

    void updateAppointmentStatus(
            Long id,
            AppointmentStatusUpdateDTO request
    );

    void deleteAppointment(Long id);
}