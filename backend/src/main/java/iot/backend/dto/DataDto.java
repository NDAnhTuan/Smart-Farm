package iot.backend.dto;

import java.time.LocalDateTime;

import iot.backend.entity.ada.Data;

public class DataDto {
     private Long feed_id;

    private String value;

    private LocalDateTime created_at;


    public DataDto(Data data) {
        this.feed_id = data.getFeed_id();
        this.value = data.getValue();
        this.created_at = data.getCreated_at();
    }

    public Long getFeed_id() {
        return feed_id;
    }

    public void setFeed_id(Long feed_id) {
        this.feed_id = feed_id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    
}
