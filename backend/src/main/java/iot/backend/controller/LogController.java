package iot.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import iot.backend.entity.ActivityLog;
import iot.backend.service.inter.LogService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class LogController {
    @Autowired
    private LogService logService;

    @PostMapping("api/log")
    public ResponseEntity<?> addLog(@RequestBody ActivityLog log){
        return ResponseEntity.ok(logService.addLog(log));
    }

    @GetMapping("api/log")
    public ResponseEntity<?> getLogs(@RequestParam String from){
        return ResponseEntity.ok(logService.getLogs(from));
    }
}
