package hema.hms.dto;

import lombok.Getter;
import lombok.Setter;
import hema.hms.enums.AppointmentStatus;

@Getter
@Setter
public class AppointmentStatusUpdateDTO {

    private AppointmentStatus status;
}