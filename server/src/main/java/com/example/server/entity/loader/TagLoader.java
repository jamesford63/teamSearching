package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class TagLoader {
    private Creator creator;

    @Autowired
    private ElasticsearchOperations operations;

    @Autowired
    private TagRepository tagRepository;

    @PostConstruct
    @Transactional
    public void loadAll(){
        operations.putMapping(Admin.class);
        log.info("Loading Data");
        for (int i = 0; i < 10; i++) {
            tagRepository.save(creator.randomTag());
        }
        log.info("Loading Completed");
    }
}
