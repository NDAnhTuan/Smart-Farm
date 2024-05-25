package iot.backend.service.implenmentation;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.ActivityLog;
import iot.backend.repo.ActivityLogRepo;
import iot.backend.service.inter.LogService;
import iot.backend.utils.Utils;

@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private ActivityLogRepo activityLogRepo;


    @Override
    public List<ActivityLog> getLogs(String from) {
        if (from == null){
            LocalDate fromDate = Utils.defaultPeriod();
            return activityLogRepo.findAllFrom(fromDate);
        }
        List<Integer> date = Utils.formateDateString(from);
        LocalDate fromDate = LocalDate.of(date.get(2), date.get(0), date.get(1));
        return activityLogRepo.findAllFrom(fromDate);
    }

    @Override
    public ActivityLog addLog(ActivityLog newLog) {
        return activityLogRepo.save(newLog);
    }
     
}
