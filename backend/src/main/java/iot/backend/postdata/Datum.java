package iot.backend.postdata;

import java.time.LocalDateTime;

public class Datum {
    private double value;
    
    // private double lat = 0.0;

    // private double lon = 0.0;

    // private double ele = 0.0;

    
    public Datum(double value) {
        this.value = value;
    }

    // public Datum(double value, double lat, double lon, double ele) {
    //     this.value = value;
    //     this.lat = lat;
    //     this.lon = lon;
    //     this.ele = ele;
    // }

    public Double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    // public double getLat() {
    //     return lat;
    // }

    // public void setLat(double lat) {
    //     this.lat = lat;
    // }

    // public double getLon() {
    //     return lon;
    // }

    // public void setLon(double lon) {
    //     this.lon = lon;
    // }

    // public double getEle() {
    //     return ele;
    // }

    // public void setEle(double ele) {
    //     this.ele = ele;
    // }
    
}