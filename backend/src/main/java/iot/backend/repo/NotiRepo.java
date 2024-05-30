package iot.backend.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import iot.backend.entity.Notification;


@Repository
public interface NotiRepo extends JpaRepository<Notification, String> {
    @Query("select n from Notification n where date(n.created_at) >= ?1")
    public List<Notification> findAllFrom(LocalDate from);   
}
