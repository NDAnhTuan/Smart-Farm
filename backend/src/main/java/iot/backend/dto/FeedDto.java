package iot.backend.dto;

import java.util.List;

import iot.backend.entity.ada.FeedAda;

public class FeedDto {
    private Long id;

    private String name;

    private String key;

    private String description;

    private String last_value;

    //private List<DataDto> data;

    public FeedDto(FeedAda feed) {
        this.last_value = feed.getLast_value();
        this.id = feed.getId();
        this.name = feed.getName();
        this.key = feed.getKey();
        this.description = feed.getDescription();
    }
    
    

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

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public String getLast_value() {
        return last_value;
    }



    public void setLast_value(String last_value) {
        this.last_value = last_value;
    }

    // public List<DataDto> getData() {
    //     return data;
    // }

    // public void setData(List<DataDto> data) {
    //     this.data = data;
    // }

    
}
