package iot.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import iot.backend.entity.Device;
@Repository
public interface DeviceRepo extends JpaRepository<Device,Long> {
    
}
