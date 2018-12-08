package com.example.server.entity.loader.utils;

import com.example.server.entity.*;
import com.example.server.entity.enums.NotificationStatus;
import com.example.server.entity.enums.NotificationType;
import com.example.server.entity.enums.UserStatus;
import lombok.Data;
import org.apache.commons.lang.RandomStringUtils;

import java.util.*;

@Data
public class Creator {
    private int length = 6;
    private List<Notification> notifications;
    private List<User> users;
    private List<Project> projects;
    private List<Tag> tags;
    private List<ProfArea> profAreas;
    private Random random = new Random();

    public void init(int depth) {
        notifications = new ArrayList<>();
        users = new ArrayList<>();
        profAreas = new ArrayList<>();
        projects = new ArrayList<>();
        tags = new ArrayList<>();
        for (int i = 0; i < depth; i++) {
            tags.add(randomTag());
        }
        for (int i = 0; i < depth; i++) {
            profAreas.add(randomProfArea());
        }
        for (int i = 0; i < depth; i++) {
            users.add(randomUser());
        }
        for (int i = 0; i < depth; i++) {
            projects.add(randomProject());
        }
    }

    private Notification randomNotification() {
        Notification notification = new Notification();
        notification.setId(UUID.randomUUID());
        notification.setStatus(NotificationStatus.UNREAD);
        notification.setType(NotificationType.INFORMATION);
        notification.setFrom(randomUser());
        notification.setTo(randomUser());
        notification.setDescription(RandomStringUtils.randomAlphabetic(length));

        return notification;
    }

    private User randomUser() {
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
            ProfArea profArea = profAreas.get(random.nextInt(profAreas.size()));
            if(!areas.contains(profArea))
                areas.add(profArea);
        }
        List<Tag> relatedTags = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            Tag tag = tags.get(random.nextInt(tags.size()));
            if(!relatedTags.contains(tag))
                relatedTags.add(tag);
        }
        user.setTags(Collections.emptyList());
        user.setProfAreas(areas);
        user.setProjectsCreated(Collections.emptyList());
        user.setProjectsParticipated(Collections.emptyList());

        return user;
    }

    private Project randomProject() {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setProfArea(profAreas.get(random.nextInt(profAreas.size())));
        project.setParticipants(Collections.singletonList(users.get(random.nextInt(users.size()))));
        project.setOwner(users.get(random.nextInt(users.size())));
        project.setDescription(RandomStringUtils.randomAlphabetic(length));
        List<Tag> relatedTags = new ArrayList<>();
        int num = random.nextInt(tags.size());
        for (int i = 0; i < num; i++) {
            Tag tag = tags.get(random.nextInt(tags.size()));
            if(!relatedTags.contains(tag))
                relatedTags.add(tag);
        }
        project.setTags(relatedTags);
        project.setCity(RandomStringUtils.randomAlphabetic(length));

        return project;
    }

    private ProfArea randomProfArea() {
        ProfArea profArea = new ProfArea();
        profArea.setId(UUID.randomUUID());
        profArea.setName(RandomStringUtils.randomAlphabetic(length));
        return profArea;
    }

    private Tag randomTag() {
        Tag tag = new Tag();
        tag.setId(UUID.randomUUID());
        tag.setName(RandomStringUtils.randomAlphabetic(length));

        return tag;
    }
}
