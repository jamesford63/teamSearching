package com.example.server.entity.loader;

import com.example.server.entity.User;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.UserRepository;
import com.example.server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class UserLoader implements InitializingBean {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    private ElasticsearchOperations operations;

    private UserService userService;

    @Autowired
    public UserLoader(ElasticsearchOperations operations, UserService userService) {
        this.operations = operations;
        this.userService = userService;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (needToLoad) {
            operations.putMapping(User.class);
            log.info("Loading users data");
            for (int i = 0; i < 10; i++) {
                userService.createUser(creator.randomUser());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load users data");
        }
    }
}
