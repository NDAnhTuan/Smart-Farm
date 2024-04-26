// package iot.backend.entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;

// @Entity
// public class LocationOfUser {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @OneToOne
//     @JoinColumn(name = "user_id", referencedColumnName = "id")
//     private UserInfo user;

//     @OneToOne
//     @JoinColumn(name = "location_id", referencedColumnName = "id")
//     private Location location;
    
// }
