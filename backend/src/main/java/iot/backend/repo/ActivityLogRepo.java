package iot.backend.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import iot.backend.entity.ActivityLog;

@Repository
public interface ActivityLogRepo extends JpaRepository<ActivityLog, Long > {

    @Query("select a from ActivityLog a where o.created_at >= ?1")
    public List<ActivityLog> findAllFrom(LocalDate from);
    // {
    //     List<ActivityLog> allLog = this.findAll();
    //     for (ActivityLog log : allLog){
    //         if (log.getCreated_at().toLocalDate() > from){
    //             result.add(log)
    //         }
    //     }
    //     return result;
    // }
}
