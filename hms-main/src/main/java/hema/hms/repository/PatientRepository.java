package hema.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hema.hms.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}