package com.example.server.entity.loader;

import com.example.server.entity.User;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class UserLoader implements InitializingBean {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    private ElasticsearchOperations operations;

    private UserRepository userRepository;

    @Autowired
    public UserLoader(ElasticsearchOperations operations, UserRepository userRepository) {
        this.operations = operations;
        this.userRepository = userRepository;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (needToLoad) {
            operations.putMapping(User.class);
            log.info("Loading users data");
            for (int i = 0; i < 10; i++) {
                userRepository.save(creator.randomUser());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load users data");
        }
    }
}
