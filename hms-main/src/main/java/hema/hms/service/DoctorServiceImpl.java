package hema.hms.service;

import lombok.RequiredArgsConstructor;
import hema.hms.dto.DoctorRequestDTO;
import hema.hms.dto.DoctorResponseDTO;
import hema.hms.entity.Doctor;
import hema.hms.entity.User;
import hema.hms.enums.Role;
import hema.hms.exception.ResourceNotFoundException;
import hema.hms.repository.DoctorRepository;
import hema.hms.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createDoctor(DoctorRequestDTO request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.DOCTOR)
                .build();

        userRepository.save(user);

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperience(request.getExperience());

        doctorRepository.save(doctor);
    }

    @Override
    public List<DoctorResponseDTO> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .map(doc -> new DoctorResponseDTO(
                        doc.getId(),
                        doc.getUser().getName(),
                        doc.getUser().getEmail(),
                        doc.getSpecialization(),
                        doc.getExperience()
                ))
                .toList();
    }

    @Override
    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        doctorRepository.delete(doctor);
    }
}