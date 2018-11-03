package com.example.server.entity.loader;

import com.example.server.entity.NotificationType;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.NotificationTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NotificationTypeLoader implements InitializingBean {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    private ElasticsearchOperations operations;

    private NotificationTypeRepository notificationTypeRepository;

    @Autowired
    public NotificationTypeLoader(ElasticsearchOperations operations, NotificationTypeRepository notificationTypeRepository) {
        this.operations = operations;
        this.notificationTypeRepository = notificationTypeRepository;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
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
