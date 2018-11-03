package com.example.server.entity.loader;

import com.example.server.entity.Notification;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NotificationLoader implements InitializingBean {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    private ElasticsearchOperations operations;

    private NotificationRepository notificationRepository;

    @Autowired
    public NotificationLoader(ElasticsearchOperations operations, NotificationRepository notificationRepository) {
        this.operations = operations;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void afterPropertiesSet() {
        if (needToLoad) {
            operations.putMapping(Notification.class);
            log.info("Loading notifications data");
            for (int i = 0; i < 10; i++) {
                notificationRepository.save(creator.randomNotification());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load notifications data");
        }
    }
}
