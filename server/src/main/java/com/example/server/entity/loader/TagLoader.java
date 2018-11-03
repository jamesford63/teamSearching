package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.Tag;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class TagLoader {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    @Autowired
    private ElasticsearchOperations operations;

    @Autowired
    private TagRepository tagRepository;

    @PostConstruct
    public void loadAll() {
        if (needToLoad) {
            operations.putMapping(Tag.class);
            log.info("Loading tags data");
            for (int i = 0; i < 10; i++) {
                tagRepository.save(creator.randomTag());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load tags data");
        }
    }
}
