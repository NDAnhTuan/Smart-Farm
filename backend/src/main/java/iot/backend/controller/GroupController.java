package iot.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import iot.backend.entity.UserInfo;
import iot.backend.exception.NotFound;
import iot.backend.service.inter.GroupService;
import iot.backend.service.inter.UserService;
import jakarta.websocket.server.PathParam;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class GroupController {
    @Autowired
    private GroupService groupService;

    // @GetMapping("/{user_id}/device")
    // public ResponseEntity<?> getDeviceList(@PathVariable Integer user_id) {
    //     try {
    //         return ResponseEntity.ok(deviceService.getDeviceList(user_id));
    //     } 
    //     catch (NotFound e) {
    //         return ResponseEntity.badRequest().body(e.getMessage());
    //     }
    // }

    @GetMapping("/{username}/feeds")
    public ResponseEntity<?> getFeedList(@PathVariable String username) {
        try {
            return ResponseEntity.ok(groupService.getFeedList(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                                .body(e.getMessage());
        } catch (Error e) {
            return ResponseEntity.internalServerError()
                                .body(e.getMessage());
        }
    }

   
    
    
    
    

    
    
}
