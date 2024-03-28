package iot.backend.entity.ada;


import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnySetter;

public class FeedAda {
    private Long id;

    private String name;

    private String key;

    private String description;

    private String last_value;

    private List<Data> data;
     
    private GroupAda group;

    @JsonAnySetter
    Map<String, Object> details = new LinkedHashMap<>();

    @JsonAnySetter
    void setDetail(String key, Object value) {
        details.put(key, value);
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

    public Map<String, Object> getDetails() {
        return details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }

    public List<Data> getData() {
        return data;
    }

    public void setData(List<Data> data) {
        this.data = data;
    }

    public GroupAda getGroup() {
        return group;
    }

    public void setGroup(GroupAda group) {
        this.group = group;
    }

    public String getLast_value() {
        return last_value;
    }

    public void setLast_value(String last_value) {
        this.last_value = last_value;
    }

    
    
    
}
