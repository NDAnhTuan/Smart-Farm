package iot.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import iot.backend.entity.Sensor;

@Repository
public interface SensorRepo extends JpaRepository<Sensor,Long> {
    
}
