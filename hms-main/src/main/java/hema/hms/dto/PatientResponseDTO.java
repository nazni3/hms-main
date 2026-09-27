package hema.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import hema.hms.enums.Gender;

@Getter
@Setter
@AllArgsConstructor
public class PatientResponseDTO {

    private Long id;
    private String name;
    private String email;
    private Integer age;
    private Gender gender;
}