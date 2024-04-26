package iot.backend.service.implenmentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.Sensor;
import iot.backend.repo.SensorRepo;

@Service
public class SensorService {
    @Autowired
    private SensorRepo sensorRepo;

    public Sensor getConfig(Long id) throws Exception{
        return sensorRepo.findById(id).get();
    }

    public Sensor updateConfig(Sensor sensor) throws Exception{
        return sensorRepo.save(sensor);
    }
}
