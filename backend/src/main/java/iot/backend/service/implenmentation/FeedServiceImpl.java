package iot.backend.service.implenmentation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import iot.backend.dto.DataDto;
import iot.backend.dto.FeedDto;
import iot.backend.entity.ada.Data;
import iot.backend.entity.ada.FeedAda;
import iot.backend.service.AdafruitService;
import iot.backend.service.inter.FeedService;


@Service
public class FeedServiceImpl implements FeedService {

    @Autowired
    AdafruitService adafruitService;

    @Override
    public FeedDto getFeedInfo(String feedKey) throws InternalError{
        try {
            FeedAda feedAda = adafruitService.getFeedInfo(feedKey);
            return new FeedDto(feedAda);
        } catch (JsonMappingException e) {
            throw new InternalError("Error: Server Error!");
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
    }

    @Override
    public List<DataDto> getFeedData(String feedKey) throws InternalError {
        List<Data> dataList = new ArrayList<>() ;
        try {
            dataList = adafruitService.getFeedData(feedKey, null, null);
        } catch (JsonMappingException e) {
            throw new InternalError("Error: Server Error!");
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
        List<DataDto> returnList = new ArrayList<>();

        for (Data data : dataList) {
            DataDto returnData = new DataDto(data);
            returnList.add(returnData);
        }
        return returnList;
    }

    @Override
    public List<DataDto> getFeedDataFrom(String feedKey, String start)  throws InternalError{
        List<Data> dataList = new ArrayList<>() ;
        try {
            dataList = adafruitService.getFeedData(feedKey, start, null);
        } catch (JsonMappingException e) {
            throw new InternalError("Error: Server Error!");
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
        List<DataDto> returnList = new ArrayList<>();

        for (Data data : dataList) {
            DataDto returnData = new DataDto(data);
            returnList.add(returnData);
        }
        return returnList;
    }

    @Override
    public List<DataDto> getFeedDataFromLimit(String feedKey, String start, Integer limit) throws InternalError {
        List<Data> dataList = new ArrayList<>() ;
        try {
            dataList = adafruitService.getFeedData(feedKey, start, limit);
        } catch (JsonMappingException e) {
            throw new InternalError("Error: Server Error!");
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
        List<DataDto> returnList = new ArrayList<>();

        for (Data data : dataList) {
            DataDto returnData = new DataDto(data);
            returnList.add(returnData);
        }
        return returnList;
    }

    @Override
    public DataDto getLastFeedData(String feedKey) throws InternalError {
        try {
            Data data = adafruitService.getLastFeedData(feedKey);
            return new DataDto(data);
        } catch (JsonMappingException e) {
            throw new InternalError("Error: Server Error!");
        } catch (JsonProcessingException e) {
            throw new InternalError("Error: Server Error!");
        }
    }

    @Override
    public void postFeedData(String feedKey, Double value) throws InternalError {
        try {
            adafruitService.postFeedData(feedKey,value);
        } catch (Exception e) {
            throw new InternalError("Error: Server Error!");
        }
    }
    
    
}
