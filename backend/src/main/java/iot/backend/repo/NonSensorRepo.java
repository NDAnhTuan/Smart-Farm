package iot.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import iot.backend.entity.NonSensor;

@Repository
public interface NonSensorRepo extends JpaRepository<NonSensor, Long> {
    
}
