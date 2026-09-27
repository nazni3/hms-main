package hema.hms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import hema.hms.enums.AppointmentStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"doctor_id", "appointment_time"})
        })
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}