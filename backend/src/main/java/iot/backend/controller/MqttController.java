// package iot.backend.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.google.gson.Gson;
// import com.google.gson.JsonObject;

// import iot.backend.service.MyGateway;

// @RestController
// public class MqttController {
//     @Autowired
//     MyGateway myGateway; 

//     @PostMapping("/send_mess")
//     public ResponseEntity<?> publish(@RequestBody String mqttMessage){
//         try{
//             //JsonObject convertObj = new Gson().fromJson(mqttMessage,JsonObject.class);

//             //myGateway.sendToMqtt(convertObj.get("message").toString(), convertObj.get("topic").toString());
//             myGateway.sendToMqtt(mqttMessage);
//             return ResponseEntity.ok("success");
//         }
//         catch (Exception e){
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body("fail");
//         }
        

//     }
// }
