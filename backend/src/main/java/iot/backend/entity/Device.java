package iot.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @OneToOne(mappedBy = "device")
    @JsonIgnore
    private Sensor sensor;

    @OneToOne(mappedBy = "device")
    @JsonIgnore
    private NonSensor nonSensor;

    // @OneToOne(mappedBy = "device")
    // private DeviceOfUser deviceOfUser;

    // @ManyToOne
    // @JoinColumn(name = "location_id", referencedColumnName = "id")
    // private Location location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public NonSensor getNonSensor() {
        return nonSensor;
    }

    public void setNonSensor(NonSensor nonSensor) {
        this.nonSensor = nonSensor;
    }

    // public DeviceOfUser getDeviceOfUser() {
    //     return deviceOfUser;
    // }

    // public void setDeviceOfUser(DeviceOfUser deviceOfUser) {
    //     this.deviceOfUser = deviceOfUser;
    // }

    
}
