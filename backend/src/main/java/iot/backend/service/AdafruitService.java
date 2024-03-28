package iot.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import iot.backend.entity.ada.Data;
import iot.backend.entity.ada.FeedAda;
import iot.backend.entity.ada.GroupAda;
import iot.backend.postdata.Datum;

@Service
public class AdafruitService {
    private final String AdaUrl = "https://io.adafruit.com/api/v2";
    

    public List<FeedAda> getFeedGroup(String groupKey) throws JsonMappingException, JsonProcessingException{
        RestTemplate restTemplate = new RestTemplate();   
        String groupInfoJson = restTemplate.getForObject(
                                        AdaUrl + '/' + 
                                        UserNameServer + '/' +
                                        "groups" + '/' +
                                        groupKey + "?x-aio-key=" +
                                        IOKey
                                        , String.class);

        ObjectMapper objectMapper = new ObjectMapper()
                                    .findAndRegisterModules()
                                    .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        GroupAda userGroup = objectMapper.readValue(groupInfoJson, GroupAda.class);
        
        List<FeedAda> dataList = new ArrayList<>(userGroup.getFeeds());
        return dataList;
    }

    public FeedAda getFeedInfo (String feedKey) throws JsonMappingException, JsonProcessingException{
        RestTemplate restTemplate = new RestTemplate(); 
        String feedInfoJson = restTemplate.getForObject(
                                        AdaUrl + '/' + 
                                        UserNameServer + '/' +
                                        "feeds" + '/' +
                                        feedKey
                                        , String.class);
        ObjectMapper objectMapper = new ObjectMapper()
                                        .findAndRegisterModules()
                                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        FeedAda feedAda = objectMapper.readValue(feedInfoJson, FeedAda.class);

        return feedAda;
    }


    public List<Data> getFeedData (String feedKey, String start, Integer limit) throws JsonMappingException, JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate(); 
        String adaUrl = AdaUrl + '/' + 
                        UserNameServer + '/' +
                        "feeds" + '/' +
                        feedKey + '/' + 
                        "data";
        if (start != null) {
            if (limit != null) {
                adaUrl = adaUrl + "?limit=" + limit + "&start_time=" + start;
            }
            else adaUrl = adaUrl +"?start_time=" + start;
        }
        String feedDataJson = restTemplate.getForObject(adaUrl, String.class);
        
        ObjectMapper objectMapper = new ObjectMapper()
                                        .findAndRegisterModules()
                                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    
        List<Data> data = new ArrayList<>();
        data = Arrays.asList(objectMapper.readValue(feedDataJson, Data[].class));        
        return data;
    }

    public Data getLastFeedData (String feedKey) throws JsonMappingException, JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate(); 
        String adaUrl = AdaUrl + '/' + 
                        UserNameServer + '/' +
                        "feeds" + '/' +
                        feedKey + '/' + 
                        "data/last?x-aio-key=" + IOKey;
                        
        String feedDataJson = restTemplate.getForObject(adaUrl, String.class);
        
        ObjectMapper objectMapper = new ObjectMapper()
                                        .findAndRegisterModules()
                                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    
        Data data = objectMapper.readValue(feedDataJson, Data.class);        
        return data;
    }

    public boolean postFeedData(String feedKey, Double value) throws JsonProcessingException{
        RestTemplate restTemplate = new RestTemplate();
       
        String adaUrl = AdaUrl + '/' + 
                        UserNameServer + '/' +
                        "feeds" + '/' +
                        feedKey + '/' + 
                        "data?x-aio-key=" + IOKey;
        Datum data = new Datum(value);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Datum> httpEntity = new HttpEntity<>(data,header);
        // ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        // String dataJson = ow.writeValueAsString(data);
        // System.out.println(dataJson);
        restTemplate.postForObject(adaUrl, httpEntity, String.class);
        Data lastData = getLastFeedData(feedKey);
        if (lastData.getValue().equals(value.toString())) return true;
        return false;
    }

    public List<FeedAda> getAllFeed() throws JsonMappingException, JsonProcessingException{
        RestTemplate restTemplate = new RestTemplate();

        String adaUrl = AdaUrl + '/' + 
                        UserNameServer + '/' +
                        "feeds";

        String feedJson = restTemplate.getForObject(adaUrl, String.class);
        
        ObjectMapper objectMapper = new ObjectMapper()
                        .findAndRegisterModules()
                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        List<FeedAda> feeds = Arrays.asList(objectMapper.readValue(feedJson, FeedAda[].class));
        return feeds; 
    }

}
