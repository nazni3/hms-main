package hema.hms.service;

import lombok.RequiredArgsConstructor;
import hema.hms.dto.AppointmentRequestDTO;
import hema.hms.dto.AppointmentResponseDTO;
import hema.hms.dto.AppointmentStatusUpdateDTO;
import hema.hms.entity.Appointment;
import hema.hms.entity.Doctor;
import hema.hms.entity.Patient;
import hema.hms.enums.AppointmentStatus;
import hema.hms.exception.ResourceNotFoundException;
import hema.hms.repository.AppointmentRepository;
import hema.hms.repository.DoctorRepository;
import hema.hms.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public void createAppointment(AppointmentRequestDTO request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        boolean alreadyBooked =
                appointmentRepository.existsByDoctorAndAppointmentTime(
                        doctor,
                        request.getAppointmentTime()
                );

        if (alreadyBooked) {
            throw new RuntimeException("Doctor already booked for this time");
        }

        Appointment appointment = new Appointment();

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        appointmentRepository.save(appointment);
    }

    @Override
    public List<AppointmentResponseDTO> getAllAppointments() {

        return appointmentRepository.findAll()
                .stream()
                .map(app -> new AppointmentResponseDTO(
                        app.getId(),
                        app.getPatient().getUser().getName(),
                        app.getDoctor().getUser().getName(),
                        app.getAppointmentTime(),
                        app.getStatus()
                ))
                .toList();
    }

    @Override
    public void updateAppointmentStatus(
            Long id,
            AppointmentStatusUpdateDTO request
    ) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

        appointment.setStatus(request.getStatus());

        appointmentRepository.save(appointment);
    }

    @Override
    public void deleteAppointment(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Appointment not found"));

        appointmentRepository.delete(appointment);
    }
}