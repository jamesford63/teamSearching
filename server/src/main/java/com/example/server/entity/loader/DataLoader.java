package com.example.server.entity.loader;

import com.example.server.entity.*;
import com.example.server.entity.loader.utils.Creator_v2;
import com.example.server.repository.*;
import com.example.server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DataLoader implements InitializingBean {
    private Creator_v2 creatorV2 = new Creator_v2();
    @Value("${need.to.load}")
    private boolean needToLoad = true;
    private ElasticsearchOperations operations;
    private UserService userService;
    private NotificationRepository notificationRepository;
    private ProfAreaRepository profAreaRepository;
    private ProjectRepository projectRepository;
    private TagRepository tagRepository;

    @Autowired
    public DataLoader(ElasticsearchOperations operations, UserService userService, NotificationRepository notificationRepository,
                      ProfAreaRepository profAreaRepository, ProjectRepository projectRepository, TagRepository tagRepository) {
        this.operations = operations;
        this.userService = userService;
        this.notificationRepository = notificationRepository;
        this.profAreaRepository = profAreaRepository;
        this.projectRepository = projectRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (needToLoad) {
            operations.putMapping(Notification.class);
            operations.putMapping(ProfArea.class);
            operations.putMapping(Project.class);
            operations.putMapping(User.class);
            operations.putMapping(Tag.class);
            creatorV2.init(10);
            log.info("Loading data");
            creatorV2.getTags().forEach(tag -> tagRepository.save(tag));
            creatorV2.getProfAreas().forEach(profArea -> profAreaRepository.save(profArea));
            creatorV2.getProjects().forEach(project -> projectRepository.save(project));
            System.out.println(creatorV2.getUsers());
            creatorV2.getUsers().forEach(u -> userService.createUser(u));
            creatorV2.getNotifications().forEach(notification -> notificationRepository.save(notification));
            log.info("Loading Completed");
        } else {
            log.info("No need to load data");
        }
    }
}

