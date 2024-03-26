package iot.backend.service.implenmentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import iot.backend.dto.DataDto;
import iot.backend.dto.FeedDto;
import iot.backend.entity.ada.FeedAda;
import iot.backend.service.AdafruitService;
import iot.backend.service.inter.FeedService;


@Service
public class FeedServiceImpl implements FeedService {

    @Autowired
    AdafruitService adafruitService;

    @Override
    public FeedDto getFeedInfo(String feedKey) {
        try {
            FeedAda feedAda = adafruitService.getFeedInfo(feedKey);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        throw new UnsupportedOperationException("Unimplemented method 'getFeedInfo'");
    }

    @Override
    public List<DataDto> getFeedData(String feedKey) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFeedData'");
    }

    @Override
    public List<DataDto> getFeedDataFrom(String feedKey, String start) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFeedDataFrom'");
    }

    @Override
    public List<DataDto> getFeedDataFromLimit(String feedKey, String start, Integer limit) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFeedDataFromLimit'");
    }

    @Override
    public DataDto getLastFeedData(String feedKey) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getLastFeedData'");
    }

    @Override
    public void postFeedData(String feedKey, String value) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'postFeedData'");
    }
    
    
}
