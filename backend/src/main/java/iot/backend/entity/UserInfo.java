package iot.backend.entity;

import jakarta.persistence.*;

@Entity
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 20)
    private String username;

    @Column(nullable = false, length = 20)
    private String pwd;

    private String name;


    // @JsonIgnore
    // @OneToMany(mappedBy = "user")
    // private List<Location> locations;

    // @OneToOne(mappedBy = "user")
    // private GroupInfo feedGroup;

    public UserInfo() {
    }

    public UserInfo(String username, String pwd, String name) {
        this.username = username;
        this.pwd = pwd;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // public GroupInfo getFeedGroup() {
    //     return feedGroup;
    // }

    // public void setFeedGroup(GroupInfo feedGroup) {
    //     this.feedGroup = feedGroup;
    // }

    // public List<Location> getLocations() {
    //     return locations;
    // }

    // public void setLocations(List<Location> locations) {
    //     this.locations = locations;
    // }

    
    
    
}
