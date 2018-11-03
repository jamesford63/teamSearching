package com.example.server.entity.loader;

import com.example.server.entity.Project;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ProjectLoader implements InitializingBean {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    private ElasticsearchOperations operations;

    private ProjectRepository projectRepository;

    @Autowired
    public ProjectLoader(ElasticsearchOperations operations, ProjectRepository projectRepository) {
        this.operations = operations;
        this.projectRepository = projectRepository;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (needToLoad) {
            operations.putMapping(Project.class);
            log.info("Loading projects data");
            for (int i = 0; i < 10; i++) {
                projectRepository.save(creator.randomProject());
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load projects data");
        }
    }
}
