package hema.hms.repository;

import hema.hms.entity.Appointment;
import hema.hms.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Check double booking
    boolean existsByDoctorAndAppointmentTime(
            Doctor doctor,
            LocalDateTime appointmentTime
    );

    // Get appointments of doctor
    List<Appointment> findByDoctor_Id(Long doctorId);

    // Get appointments of patient
    List<Appointment> findByPatient_Id(Long patientId);
}