package hema.hms.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import hema.hms.dto.AuthResponse;
import hema.hms.dto.LoginRequest;
import hema.hms.dto.RegisterRequest;
import hema.hms.entity.Doctor;
import hema.hms.entity.Patient;
import hema.hms.entity.User;
import hema.hms.enums.Role;
import hema.hms.exception.ResourceNotFoundException;
import hema.hms.repository.DoctorRepository;
import hema.hms.repository.PatientRepository;
import hema.hms.repository.UserRepository;
import hema.hms.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public void register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        user = userRepository.save(user);

        // Create Patient record automatically
        if (user.getRole() == Role.PATIENT) {

            Patient patient = new Patient();

            patient.setUser(user);
            patient.setAge(request.getAge());
            patient.setGender(request.getGender());

            patientRepository.save(patient);

            System.out.println("PATIENT CREATED: " + user.getName());
        }

        if (user.getRole() == Role.DOCTOR) {

            Doctor doctor = new Doctor();

            doctor.setUser(user);
            doctor.setSpecialization(request.getSpecialization());
            doctor.setExperience(request.getExperience());

            doctorRepository.save(doctor);
        }

        // Create Doctor record automatically
        // if (user.getRole() == Role.DOCTOR) {

        //     Doctor doctor = new Doctor();

        //     doctor.setUser(user);
        //     doctor.setSpecialization("General");
        //     doctor.setExperience(0);

        //     doctorRepository.save(doctor);

        //     System.out.println("DOCTOR CREATED: " + user.getName());
        // }
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                user.getName(),
                user.getRole().toString()
        );
    }
}