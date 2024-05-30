package iot.backend.service.implenmentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.Sensor;
import iot.backend.repo.SensorRepo;

@Service
public class SensorService {
    @Autowired
    private SensorRepo sensorRepo;

    public Sensor getConfig(String key) throws Exception{
        return sensorRepo.findByKey(key);
    }

    public Sensor updateConfig(Sensor sensor) throws Exception{
        Sensor findSensor = sensorRepo.findByKey(sensor.getKey_sensor());
        if (sensor.getLowerAlert() != null){
            findSensor.setLowerAlert(sensor.getLowerAlert());
        }
        if (sensor.getUpperAlert() != null){
            findSensor.setUpperAlert(sensor.getUpperAlert());
        }
        return sensorRepo.save(findSensor);
    }

    public List<Sensor> getAll() {
        return sensorRepo.findAll();
    }
}
