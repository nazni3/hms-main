package hema.hms.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import hema.hms.enums.Gender;

@Getter
@Setter
public class PatientRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    private String email;

    @Size(min = 4, message = "Password must be at least 4 characters")
    private String password;

    @Min(value = 0, message = "Age cannot be negative")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Gender gender;
}