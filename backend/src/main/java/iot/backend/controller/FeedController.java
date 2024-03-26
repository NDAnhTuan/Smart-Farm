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


    @GetMapping("/{username}/feeds/{feedKey}")
    public ResponseEntity<?> getFeedInfo(@PathVariable String username, @PathVariable String feedKey) {
        try {
            return ResponseEntity.ok().body(feedService.getFeedInfo(feedKey));
        } catch (Error e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
    
    @GetMapping("/{username}/feeds/{feedKey}/data")
    public ResponseEntity<?> getFeedData(@PathVariable String username, @PathVariable String feedKey, 
                                        @RequestParam(required = false) String start, @RequestParam(required = false) Integer limit) {
        try {
            if (start!=null) {
                if (limit != null) return ResponseEntity.ok(feedService.getFeedData(feedKey));
                return ResponseEntity.ok(feedService.getFeedDataFrom(feedKey, start));
            }
            return ResponseEntity.ok(feedService.getFeedDataFromLimit(feedKey, start, limit));
        } catch (Error e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{username}/feeds/{feedKey}/data/last")
    public ResponseEntity<?> getLastFeedData(@PathVariable String username, @PathVariable String feedKey) {
        try {
            return ResponseEntity.ok(feedService.getLastFeedData(feedKey));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
        
    }




    @PostMapping("/{username}/feeds/{feedKey}/data")
    public ResponseEntity<?> sendFeedSignal(@PathVariable String username, @PathVariable String feedKey,
                                            @RequestParam Double value) {
        try {
            feedService.postFeedData(feedKey,value);
            return ResponseEntity.ok("");
        } catch (Error e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
    
    
}
