package iot.backend.service.inter;

import java.util.List;

import org.springframework.stereotype.Service;

import iot.backend.dto.DataDto;
import iot.backend.dto.FeedDto;

@Service
public interface FeedService {
    public FeedDto getFeedInfo (String feedKey);

    public List<DataDto> getFeedData(String feedKey);

    public List<DataDto> getFeedDataFrom(String feedKey, String start);

    public List<DataDto> getFeedDataFromLimit(String feedKey, String start, Integer limit);

    public DataDto getLastFeedData(String feedKey);

    public void postFeedData(String feedKey, String value);
}
