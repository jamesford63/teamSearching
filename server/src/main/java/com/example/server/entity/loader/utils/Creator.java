package com.example.server.entity.loader.utils;

import com.example.server.entity.*;
import com.example.server.entity.enums.UserStatus;
import org.apache.commons.lang.RandomStringUtils;

import java.util.Collections;
import java.util.UUID;

public class Creator {
    private int length = 6;

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
        user.setProfAreas(Collections.singletonList(randomProfArea()));
        user.setProjectsCreated(Collections.singletonList(randomProject()));
        user.setProjectsParticipated(Collections.singletonList(randomProject()));

        return user;
    }

    public Project randomProject() {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setProfArea(randomProfArea());
        project.setParticipants(Collections.singletonList(randomUser()));
        project.setOwner(randomUser());
        project.setDescription(RandomStringUtils.randomAlphabetic(length));
        project.setTags(Collections.singletonList(randomTag()));

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
        profArea.setRelatedTags(Collections.singletonList(randomTag()));

        return profArea;
    }


    public NotificationType randomNotificationType() {
        NotificationType notificationType = new NotificationType();
        notificationType.setId(UUID.randomUUID());
        notificationType.setName(RandomStringUtils.randomAlphabetic(length));

        return notificationType;
    }



}
