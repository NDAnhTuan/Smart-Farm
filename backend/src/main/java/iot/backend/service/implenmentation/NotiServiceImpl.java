package iot.backend.service.implenmentation;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.Notification;
import iot.backend.repo.NotiRepo;
import iot.backend.service.inter.NotiService;
import iot.backend.utils.Utils;

@Service
public class NotiServiceImpl implements NotiService{
    @Autowired
    private NotiRepo notiRepo;

    @Override
    public Notification addNotification(Notification noti) {
        return notiRepo.save(noti);
    }

    @Override
    public List<Notification> getNotification(String from) {
        if (from == null){
            LocalDate fromDate = Utils.defaultPeriod();
            return notiRepo.findAllFrom(fromDate);
        }
        List<Integer> date = Utils.formateDateString(from);
        LocalDate fromDate = LocalDate.of(date.get(2), date.get(0), date.get(1));
        return notiRepo.findAllFrom(fromDate);
    }
    
}
