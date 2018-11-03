package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.ProfArea;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.ProfAreaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class ProfAreaLoader {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    @Autowired
    private ElasticsearchOperations operations;

    @Autowired
    private ProfAreaRepository profAreaRepository;

    @PostConstruct
    public void loadAll() {
        if (needToLoad) {
            operations.putMapping(ProfArea.class);
            log.info("Loading profAreas data");
            for (int i = 0; i < 10; i++) {
                profAreaRepository.save(creator.randomProfArea());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load profAreas data");
        }
    }
}
