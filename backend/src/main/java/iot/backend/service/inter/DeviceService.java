package iot.backend.service.inter;

import java.util.List;

import org.springframework.stereotype.Service;

import iot.backend.entity.Device;
import iot.backend.entity.NonSensor;
import iot.backend.entity.Sensor;

@Service
public interface DeviceService {
    // public Device addDevice(Device device) throws Exception;
    public Sensor getSensorConfig(String key) throws Exception;
    public Sensor updateSensorConfig(Sensor sensor) throws Exception;
    public NonSensor getNonSensorStatus(Long id) throws Exception;
    public NonSensor updateNonSensorStatus(NonSensor nonSensor) throws Exception;
    public List<Sensor> getAllSensorConfig();

}
