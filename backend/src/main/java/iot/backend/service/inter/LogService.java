package iot.backend.service.inter;

import java.util.List;
import org.springframework.stereotype.Service;

import iot.backend.entity.ActivityLog;

@Service
public interface LogService {
    public List<ActivityLog> getLogs (String from);

    public ActivityLog addLog (ActivityLog newLog);

}
