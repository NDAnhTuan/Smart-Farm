package iot.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import iot.backend.entity.Sensor;

@Repository
public interface SensorRepo extends JpaRepository<Sensor,Long> {
    @Query("select s from Sensor s where s.key_sensor = ?1")
    public Sensor findByKey(String key);   
}
