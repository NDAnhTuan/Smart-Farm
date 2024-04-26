// package iot.backend.entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;

// @Entity
// public class DeviceOfUser {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @OneToOne
//     @JoinColumn(name = "device_id",referencedColumnName = "id")
//     private Device device;

//     @OneToOne
//     @JoinColumn(name = "user_id", referencedColumnName = "id")
//     private UserInfo user;

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public Device getDevice() {
//         return device;
//     }

//     public void setDevice(Device device) {
//         this.device = device;
//     }

//     public UserInfo getUser() {
//         return user;
//     }

//     public void setUser(UserInfo user) {
//         this.user = user;
//     }

    
// }
