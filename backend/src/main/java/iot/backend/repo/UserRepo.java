package iot.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import iot.backend.entity.UserInfo;

@Repository
public interface UserRepo extends JpaRepository<UserInfo,Integer> {
    @Query("Select u from UserInfo u where u.username = ?1 ")
    public Optional<UserInfo> findByUserName(String username);

}
