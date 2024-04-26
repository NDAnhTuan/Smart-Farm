package iot.backend.service.inter;

import org.springframework.stereotype.Service;

import iot.backend.entity.Device;
import iot.backend.entity.NonSensor;
import iot.backend.entity.Sensor;

@Service
public interface DeviceService {
    public Device addDevice(Device device) throws Exception;
    public Sensor getSensorConfig(Long id) throws Exception;
    public Sensor updateSensorConfig(Sensor sensor) throws Exception;
    public NonSensor getNonSensorStatus(Long id) throws Exception;
    public NonSensor updateNonSensorStatus(NonSensor nonSensor) throws Exception;

}
