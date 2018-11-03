package com.example.server.entity.loader.utils;

import com.example.server.entity.*;
import com.example.server.entity.enums.UserStatus;
import lombok.Data;
import org.apache.commons.lang.RandomStringUtils;

import java.util.*;

@Data
public class Creator {
    private int length = 6;
    private List<Admin> admins;
    private List<Notification> notifications;
    private List<User> users;
    private List<Project> projects;
    private List<NotificationType> notificationTypes;
    private List<Tag> tags;
    private List<ProfArea> profAreas;
    private Random random;

    public void init(int depth) {
        admins = new ArrayList<>();
        notifications = new ArrayList<>();
        users = new ArrayList<>();
        profAreas = new ArrayList<>();
        projects = new ArrayList<>();
        tags = new ArrayList<>();
        notificationTypes = new ArrayList<>();
        for (int i = 0; i < depth; i++) {
            tags.add(randomTag());
            notificationTypes.add(randomNotificationType());
            admins.add(randomAdmin());
        }
        for (int i = 0; i < depth; i++) {
            profAreas.add(randomProfArea());
        }
        for (int i = 0; i < depth; i++) {
            users.add(randomUser());
            projects.add(randomProject());
        }
    }

    public Admin randomAdmin() {
        Admin admin = new Admin();
        admin.setId(UUID.randomUUID());
        admin.setLogin(RandomStringUtils.randomAlphabetic(length));
        admin.setPassword(RandomStringUtils.randomAlphabetic(length));

        return admin;
    }

    public Notification randomNotification() {
        Notification notification = new Notification();
        notification.setId(UUID.randomUUID());
        notification.setStatus(NotificationStatus.UNREAD);
        notification.setType(randomNotificationType());
        notification.setFrom(randomUser());
        notification.setTo(randomUser());
        notification.setDescription(RandomStringUtils.randomAlphabetic(length));

        return notification;
    }

    public User randomUser() {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setLogin(RandomStringUtils.randomAlphabetic(length));
        user.setPassword(RandomStringUtils.randomAlphabetic(length));
        user.setName(RandomStringUtils.randomAlphabetic(length));
        user.setLastName(RandomStringUtils.randomAlphabetic(length));
        user.setEmail(RandomStringUtils.randomAlphabetic(length));
        user.setCity(RandomStringUtils.randomAlphabetic(length));
        user.setUserStatus(UserStatus.OFFLINE);
        user.setCity(RandomStringUtils.randomAlphabetic(length));
        user.setDescription(RandomStringUtils.randomAlphabetic(length));
        List<ProfArea> areas = new ArrayList<>();
        int num = random.nextInt(profAreas.size());
        for (int i = 0; i < num; i++) {
            ProfArea profArea = profAreas.get(random.nextInt(tags.size()));
            if(!areas.contains(profArea))
                areas.add(profArea);
        }
        user.setProfAreas(areas);
        user.setProjectsCreated(Collections.singletonList(randomProject()));
        user.setProjectsParticipated(Collections.singletonList(randomProject()));

        return user;
    }

    public Project randomProject() {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setProfArea(profAreas.get(random.nextInt(profAreas.size())));
        project.setParticipants(Collections.singletonList(randomUser()));
        project.setOwner(randomUser());
        project.setDescription(RandomStringUtils.randomAlphabetic(length));
        List<Tag> relatedTags = new ArrayList<>();
        int num = random.nextInt(tags.size());
        for (int i = 0; i < num; i++) {
            Tag tag = tags.get(random.nextInt(tags.size()));
            if(!relatedTags.contains(tag))
                relatedTags.add(tag);
        }
        project.setTags(relatedTags);

        return project;
    }

    public Tag randomTag() {
        Tag tag = new Tag();
        tag.setId(UUID.randomUUID());
        tag.setName(RandomStringUtils.randomAlphabetic(length));

        return tag;
    }

    public ProfArea randomProfArea() {
        ProfArea profArea = new ProfArea();
        profArea.setId(UUID.randomUUID());
        profArea.setName(RandomStringUtils.randomAlphabetic(length));
        int num = random.nextInt(tags.size());
        List<Tag> relatedTags = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            Tag tag = tags.get(random.nextInt(tags.size()));
            if(!relatedTags.contains(tag))
                relatedTags.add(tag);
        }
        profArea.setRelatedTags(relatedTags);
        return profArea;
    }


    public NotificationType randomNotificationType() {
        NotificationType notificationType = new NotificationType();
        notificationType.setId(UUID.randomUUID());
        notificationType.setName(RandomStringUtils.randomAlphabetic(length));

        return notificationType;
    }
}
