package iot.backend.service.implenmentation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iot.backend.entity.UserInfo;
import iot.backend.repo.UserRepo;
import iot.backend.service.inter.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    private Optional<UserInfo> findByUserName(String username){
        return userRepo.findByUserName(username);
    }
    

    @Override
    public Optional<UserInfo> register(UserInfo user) {
        Optional<UserInfo> findUser = findByUserName(user.getUsername());
        if (findUser != null) return null;
        UserInfo newUser = new UserInfo(user.getUsername(), user.getPwd(), user.getName());
        userRepo.save(newUser);
        Optional<UserInfo> opt = Optional.ofNullable(newUser);
        return opt;
    }

    @Override
    public Optional<UserInfo> login(UserInfo user) {
        Optional<UserInfo> findUser = findByUserName(user.getUsername());
        if (findUser != null) {
            if (findUser.get().getPwd() == user.getPwd()) return findUser;
            return null;
        }
        return null;
    }

    @SuppressWarnings("null")
    @Override
    public Optional<UserInfo> findUser(Integer user_id) {
        return userRepo.findById(user_id);
    }
    
    
    
}
