package iot.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import iot.backend.service.inter.FeedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class FeedController {
    @Autowired
    private FeedService feedService;


    @GetMapping("/{username}/feeds/{feedKey}/data")
    public ResponseEntity<?> getFeedData(@PathVariable String username, @PathVariable String feedKey) {
        return new String();
    }

    @PostMapping("/{username}/feeds/{feedKey}/data")
    public ResponseEntity<?> sendFeedSignal(@PathVariable String username, @PathVariable String feedKey) {
        
        return entity;
    }
    
    
}
