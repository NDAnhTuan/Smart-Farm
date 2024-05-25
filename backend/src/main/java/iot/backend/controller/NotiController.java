package iot.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import iot.backend.entity.Notification;
import iot.backend.service.inter.NotiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class NotiController {
    @Autowired
    private NotiService notiService;

    @GetMapping("api/noti")
    public ResponseEntity<?> getNotification(@RequestParam String from) {
        return ResponseEntity.ok(notiService.getNotification(from));
    }

    @PostMapping("api/noti")
    public ResponseEntity<?> addNotification (@RequestBody Notification notification) {
        return ResponseEntity.ok(notiService.addNotification(notification));
    }
    
    
}
