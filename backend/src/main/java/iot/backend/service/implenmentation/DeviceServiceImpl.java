package iot.backend.service.implenmentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.Device;
import iot.backend.entity.NonSensor;
import iot.backend.entity.Sensor;
import iot.backend.repo.DeviceRepo;
import iot.backend.service.inter.DeviceService;

@Service
public class DeviceServiceImpl implements DeviceService{
    @Autowired
    private SensorService sensorService;

    @Autowired
    private NonSensorService nonSensorService;

    // @Autowired
    // private DeviceRepo deviceRepo;

    // @Override
    // public Device addDevice(Device device) throws Exception {
    //    if (deviceRepo.findById(device.getId()) == null) {
    //         return deviceRepo.save(device);
    //    }
    //    else throw new Exception("is Available");
    // }

    @Override
    public Sensor getSensorConfig(String id) throws Exception {
        return sensorService.getConfig(id);
    }

    @Override
    public Sensor updateSensorConfig(Sensor sensor) throws Exception {
        return sensorService.updateConfig(sensor);    
    }

    @Override
    public NonSensor getNonSensorStatus(Long id) throws Exception {
        return nonSensorService.getStatus(id);
    }

    @Override
    public NonSensor updateNonSensorStatus(NonSensor nonSensor) throws Exception {
        return nonSensorService.updateStatus(nonSensor);
    }

    
    
}
