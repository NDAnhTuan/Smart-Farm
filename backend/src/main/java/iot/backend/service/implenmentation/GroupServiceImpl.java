package iot.backend.service.implenmentation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import iot.backend.dto.FeedDto;
import iot.backend.entity.UserInfo;
import iot.backend.entity.ada.FeedAda;
import iot.backend.exception.NotFound;
import iot.backend.repo.UserRepo;
import iot.backend.service.AdafruitService;
import iot.backend.service.inter.GroupService;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private AdafruitService adafruitService;

    @Override
    public List<FeedDto> getFeedList(String username) throws InternalError {
        List<FeedAda> feedAdas;
        try {
            feedAdas = adafruitService.getFeedGroup(username);
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
        List<FeedDto> result = new ArrayList<>();
        for (FeedAda feed : feedAdas){
            result.add(new FeedDto(feed));
        }
        return result;
    }

    @Override
    public List<FeedDto> getAllFeed(String username, String des) throws InternalError {
        List<FeedAda> feedAdas;
        try {
            feedAdas = adafruitService.getAllFeed();
        } catch (JsonMappingException e) {
            throw new InternalError("Error: Server Error!");
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
        List<FeedDto> result = new ArrayList<>();
        for (FeedAda feedAda : feedAdas){
            if (feedAda.getGroup().getName().equals(username) ){
                if(des != ""){
                    if (feedAda.getDescription().equals(des)){
                        result.add(new FeedDto(feedAda));
                    }
                }
                else result.add(new FeedDto(feedAda));
            }
            
        }
        return result;

    }
    


    
}
