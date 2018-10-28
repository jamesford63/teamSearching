package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class AdminLoader {
    private Creator creator;

    @Autowired
    private ElasticsearchOperations operations;

    @Autowired
    private AdminRepository adminRepository;

    @PostConstruct
    @Transactional
    public void loadAll(){
        operations.putMapping(Admin.class);
        log.info("Loading Data");
        for (int i = 0; i < 10; i++) {
            adminRepository.save(creator.randomAdmin());
        }
        log.info("Loading Completed");
    }
}

