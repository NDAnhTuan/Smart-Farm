package iot.backend.service.inter;

import java.util.List;

import org.springframework.stereotype.Service;

import iot.backend.dto.DataDto;
import iot.backend.dto.FeedDto;

@Service
public interface FeedService {
    public FeedDto getFeedInfo (String feedKey) throws InternalError;

    public List<DataDto> getFeedData(String feedKey) throws InternalError;

    public List<DataDto> getFeedDataFrom(String feedKey, String start) throws InternalError;

    public List<DataDto> getFeedDataFromLimit(String feedKey, String start, Integer limit) throws InternalError;

    public DataDto getLastFeedData(String feedKey) throws InternalError;

    public Boolean postFeedData(String feedKey, Double value) throws InternalError;
}
