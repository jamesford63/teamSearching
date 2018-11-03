package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.NotificationType;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.NotificationTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class NotificationTypeLoader {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    @Autowired
    private ElasticsearchOperations operations;

    @Autowired
    private NotificationTypeRepository notificationTypeRepository;

    @PostConstruct
    public void loadAll() {
        if (needToLoad) {
            operations.putMapping(NotificationType.class);
            log.info("Loading notification types data");
            for (int i = 0; i < 10; i++) {
                notificationTypeRepository.save(creator.randomNotificationType());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load notification types data");
        }
    }
}
