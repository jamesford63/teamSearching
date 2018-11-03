package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.User;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class UserLoader {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    @Autowired
    private ElasticsearchOperations operations;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void loadAll() {
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
