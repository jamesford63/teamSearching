package com.example.server.entity.loader;

import com.example.server.entity.Admin;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.AdminRepository;
import com.example.server.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AdminLoader implements InitializingBean {
    private Creator creator = new Creator();
    @Value("${need.to.load}")
    private boolean needToLoad;

    private ElasticsearchOperations operations;

    private AdminService adminService;

    @Autowired
    public AdminLoader(ElasticsearchOperations operations, AdminService adminService) {
        this.operations = operations;
        this.adminService = adminService;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        if (needToLoad) {
            operations.putMapping(Admin.class);
            log.info("Loading admins data");
            for (int i = 0; i < 10; i++) {
                Admin admin = creator.randomAdmin();
                System.out.println(admin);
                adminService.createAdmin(admin);
            }
            log.info("Loading Completed");
        } else {
            log.info("No need to load admins data");
        }
    }
}

