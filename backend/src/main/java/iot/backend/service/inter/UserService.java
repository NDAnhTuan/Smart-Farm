package iot.backend.service.inter;

import java.util.Optional;

import org.springframework.stereotype.Service;

import iot.backend.entity.UserInfo;

@Service
public interface UserService {
    public Optional<UserInfo> register(UserInfo user);

    public Optional<UserInfo> login(UserInfo user);

    public Optional<UserInfo> findUser(Integer user_id);
    
}
