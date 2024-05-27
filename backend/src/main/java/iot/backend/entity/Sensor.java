package iot.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "device_id", referencedColumnName = "id")
    @JsonIgnore
    private Device device;

    // private Double minVal;

    // private Double maxVal;

    private Double upperAlert;

    private Double lowerAlert;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    // public Double getMinVal() {
    //     return minVal;
    // }

    // public void setMinVal(Double minVal) {
    //     this.minVal = minVal;
    // }

    // public Double getMaxVal() {
    //     return maxVal;
    // }

    // public void setMaxVal(Double maxVal) {
    //     this.maxVal = maxVal;
    // }

    public Double getUpperAlert() {
        return upperAlert;
    }

    public void setUpperAlert(Double upperAlert) {
        this.upperAlert = upperAlert;
    }

    public Double getLowerAlert() {
        return lowerAlert;
    }

    public void setLowerAlert(Double lowerAlert) {
        this.lowerAlert = lowerAlert;
    }

    
}
