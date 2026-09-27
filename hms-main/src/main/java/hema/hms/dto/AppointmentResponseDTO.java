package hema.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import hema.hms.enums.AppointmentStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AppointmentResponseDTO {

    private Long id;

    private String patientName;
    private String doctorName;

    private LocalDateTime appointmentTime;

    private AppointmentStatus status;
}