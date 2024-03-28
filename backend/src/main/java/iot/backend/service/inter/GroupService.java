
package iot.backend.service.inter;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import iot.backend.dto.FeedDto;
import iot.backend.entity.ada.FeedAda;
import iot.backend.exception.NotFound;

@Service
public interface GroupService {
    public List<FeedDto> getFeedList(String username) throws InternalError;

    public List<FeedDto> getAllFeed(String username, String des) throws InternalError;
}
