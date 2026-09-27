package hema.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DoctorResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String specialization;
    private int experience;
}