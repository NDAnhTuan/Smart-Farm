// package iot.backend.entity;

// import java.util.List;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.OneToOne;

// @Entity
// public class Location {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @OneToOne(mappedBy = "location")
//     private LocationOfUser locationOfUser;

//     private String name;

//     @OneToMany(mappedBy = "location")
//     private List<Device> deviceList;

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public LocationOfUser getLocationOfUser() {
//         return locationOfUser;
//     }

//     public void setLocationOfUser(LocationOfUser locationOfUser) {
//         this.locationOfUser = locationOfUser;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

    
// }
