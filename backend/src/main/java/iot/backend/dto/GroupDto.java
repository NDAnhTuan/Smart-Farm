package iot.backend.dto;

import java.util.List;

import iot.backend.entity.ada.FeedAda;
import iot.backend.entity.ada.GroupAda;

public class GroupDto {
    private Long id;

    private String key;

    private String name;

    private List<FeedAda> feeds;

    public GroupDto(GroupAda group) {
        this.id = group.getId();
        this.key = group.getKey();
        this.name = group.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FeedAda> getFeeds() {
        return feeds;
    }

    public void setFeeds(List<FeedAda> feeds) {
        this.feeds = feeds;
    }

    
}
