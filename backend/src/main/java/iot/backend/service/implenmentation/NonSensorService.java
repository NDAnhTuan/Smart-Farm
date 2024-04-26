package iot.backend.service.implenmentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.NonSensor;
import iot.backend.repo.NonSensorRepo;

@Service
public class NonSensorService {
    @Autowired
    private NonSensorRepo nonSensorRepo;

    public NonSensor getStatus(Long id) throws Exception{
        return nonSensorRepo.findById(id).get();
    }
    
    public NonSensor updateStatus(NonSensor nonSensor) throws Exception{
        return nonSensorRepo.save(nonSensor);
    }
}
