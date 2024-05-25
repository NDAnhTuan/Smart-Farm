package iot.backend.service.inter;

import java.util.List;

import org.springframework.stereotype.Service;

import iot.backend.entity.Notification;

@Service
public interface NotiService {
    public Notification addNotification(Notification noti);
    public List<Notification> getNotification(String from);
    
}
