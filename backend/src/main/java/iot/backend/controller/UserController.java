package iot.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import iot.backend.entity.UserInfo;
import iot.backend.service.inter.UserService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserInfo user) {
        try {
            Optional<UserInfo> newUser = userService.register(user);
            if (newUser != null) return ResponseEntity.ok(newUser);
            return ResponseEntity.badRequest().body("Username đã tồn tại!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalit argument: " + e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserInfo user){
        try {
            Optional<UserInfo> userInfo = userService.login(user);
            if ( userInfo != null) return ResponseEntity.ok(userInfo);
            return ResponseEntity.badRequest().body("Username hoặc mật khẩu không chính xác!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid argument: "+ e.getMessage());
        }
    }

    


}
