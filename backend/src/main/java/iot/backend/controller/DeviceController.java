package iot.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import iot.backend.entity.Sensor;
import iot.backend.service.inter.DeviceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    // @PostMapping("api/device")
    // public ResponseEntity<?> addDevice(@RequestBody Device device) {
    //     try {
    //         return ResponseEntity.ok(deviceService.addDevice(device)); 
    //     } catch (Exception e) {
    //         return ResponseEntity.badRequest().body("Bad request");
    //     }
    // }
    
    @GetMapping("api/device/sensor")
    public ResponseEntity<?> getAllSensorConfig() {
        try {
            return ResponseEntity.ok(deviceService.getAllSensorConfig()); 
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    

    @GetMapping("api/device/sensor/{id}")
    public ResponseEntity<?> getSensorConfig(@PathVariable String id) {
        try {
            return ResponseEntity.ok(deviceService.getSensorConfig(id)); 
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("api/device/sensor/{id}")
    public ResponseEntity<?> updateSensorConfig(@RequestBody Sensor sensor){
        try {
            return ResponseEntity.ok(deviceService.updateSensorConfig(sensor));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Bad Request");
        }
    }

    // @GetMapping("api/device/non-sensor/{id}")
    // public ResponseEntity<?> getNonSensorStatus(@PathVariable Long id) {
    //     try {
    //         return ResponseEntity.ok(deviceService.getNonSensorStatus(id));
    //     } catch (Exception e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @PutMapping("api/device/non-sensor/{id}")
    // public ResponseEntity<?> updateNonSensorStatus(@RequestBody NonSensor nonSensor) {
    //     try {
    //         return ResponseEntity.ok(deviceService.updateNonSensorStatus(nonSensor));
    //     } catch (Exception e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    
    

}
