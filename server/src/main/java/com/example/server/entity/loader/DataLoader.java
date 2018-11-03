package com.example.server.entity.loader;

import com.example.server.entity.*;
import com.example.server.entity.loader.utils.Creator;
import com.example.server.repository.*;
import com.example.server.service.AdminService;
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
	private Creator creator = new Creator();
	@Value("${need.to.load}")
	private boolean needToLoad = true;
	private ElasticsearchOperations operations;
	private AdminService adminService;
	private UserService userService;
	private NotificationRepository notificationRepository;
	private NotificationTypeRepository notificationTypeRepository;
	private ProfAreaRepository profAreaRepository;
	private TagRepository tagRepository;
	private ProjectRepository projectRepository;

	@Autowired
	public DataLoader(ElasticsearchOperations operations, AdminService adminService, UserService userService, NotificationRepository notificationRepository,
					  NotificationTypeRepository notificationTypeRepository, ProfAreaRepository profAreaRepository, TagRepository tagRepository, ProjectRepository projectRepository){
		this.adminService = adminService;
		this.operations = operations;
		this.userService = userService;
		this.notificationRepository = notificationRepository;
		this.notificationTypeRepository = notificationTypeRepository;
		this.profAreaRepository = profAreaRepository;
		this.tagRepository = tagRepository;
		this.projectRepository = projectRepository;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		if (needToLoad) {
			operations.putMapping(Admin.class);
			operations.putMapping(NotificationType.class);
			operations.putMapping(Notification.class);
			operations.putMapping(ProfArea.class);
			operations.putMapping(Project.class);
			operations.putMapping(User.class);
			operations.putMapping(Tag.class);
			creator.init(10);
			log.info("Loading data");
			creator.getTags().forEach(tag -> tagRepository.save(tag));
			creator.getNotifications().forEach(notification -> notificationRepository.save(notification));
			creator.getNotificationTypes().forEach(notificationType -> notificationTypeRepository.save(notificationType));
			creator.getProfAreas().forEach(profArea -> profAreaRepository.save(profArea));
			creator.getProjects().forEach(project -> projectRepository.save(project));
			creator.getAdmins().forEach(a -> adminService.createAdmin(a));
			creator.getUsers().forEach(u -> userService.createUser(u));
			log.info("Loading Completed");
		} else {
			log.info("No need to load data");
		}
	}
}

