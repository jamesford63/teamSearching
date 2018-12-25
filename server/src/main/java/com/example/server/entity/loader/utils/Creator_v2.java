package com.example.server.entity.loader.utils;

import com.example.server.entity.*;
import com.example.server.entity.enums.NotificationType;
import lombok.Data;
import org.apache.commons.lang.RandomStringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Data
public class Creator_v2 {
    private int length = 6;
    private List<Notification> notifications;
    private List<User> users;
    private List<Project> projects;
    private List<Tag> tags;
    private List<ProfArea> profAreas;
    private Random random = new Random();
    private final String PREFIX = System.getProperty("user.dir") + "/server/src/main/resources/creator-utils/";

    public void init(int depth) throws IOException {
        notifications = new ArrayList<>();
        users = new ArrayList<>();
        profAreas = new ArrayList<>();
        projects = new ArrayList<>();
        tags = new ArrayList<>();
        initTags();
        initProfAreas();
        initUsers(depth);
        initProjects(depth);
        initNotifications(depth);
    }

    private void initNotifications(int depth) {
        for (int j = 0; j < depth; j++) {
            Notification notification = new Notification();
            notification.setId(UUID.randomUUID());
            notification.setType(NotificationType.INFORMATION);
            int from = random.nextInt(users.size());
            int to = random.nextInt(users.size());
            while (from != to)
                to = random.nextInt(users.size());
            notification.setFrom(users.get(from));
            notification.setTo(users.get(to));
            notification.setDescription(RandomStringUtils.randomAlphabetic(length));
            notifications.add(notification);
        }
    }

    private void initUsers(int depth) throws IOException {
        List<String> names = Files.lines(Paths.get(PREFIX + "user-names.txt")).collect(Collectors.toList());
        List<String> cities = Files.lines(Paths.get(PREFIX + "cities.txt")).collect(Collectors.toList());
        List<String> lastnames = Files.lines(Paths.get(PREFIX + "user-last-names.txt")).collect(Collectors.toList());
        for (int j = 0; j < depth; j++) {
            User user = new User();
            user.setId(UUID.randomUUID());
            user.setLogin(RandomStringUtils.randomAlphabetic(length));
            user.setPassword(RandomStringUtils.randomAlphabetic(length));
            int num = random.nextInt(names.size());
            user.setName(names.get(num));
            num = random.nextInt(lastnames.size());
            user.setLastName(lastnames.get(num));
            user.setEmail(RandomStringUtils.randomAlphabetic(length));
            num = random.nextInt(cities.size());
            user.setCity(cities.get(num));
            user.setDescription(RandomStringUtils.randomAlphabetic(length));
            List<ProfArea> areas = new ArrayList<>();
            num = random.nextInt(profAreas.size());
            for (int i = 0; i < num; i++) {
                ProfArea profArea = profAreas.get(random.nextInt(profAreas.size()));
                if (!areas.contains(profArea))
                    areas.add(profArea);
            }
            List<Tag> relatedTags = new ArrayList<>();
            for (int i = 0; i < num; i++) {
                Tag tag = tags.get(random.nextInt(tags.size()));
                if (!relatedTags.contains(tag))
                    relatedTags.add(tag);
            }
            user.setTags(relatedTags);
            user.setProfAreas(areas);
            user.setProjectsCreated(new ArrayList<>());
            user.setProjectsParticipated(new ArrayList<>());
            users.add(user);
        }
    }

    private void initProjects(int depth) throws IOException {
        List<String> names = Files.lines(Paths.get(PREFIX + "project-names.txt")).collect(Collectors.toList());
        List<String> cities = Files.lines(Paths.get(PREFIX + "cities.txt")).collect(Collectors.toList());
        for (int j = 0; j < depth; j++) {
            Project project = new Project();
            project.setId(UUID.randomUUID());
            int num = random.nextInt(names.size());
            project.setName(names.get(num));
            //project.setProfArea(profAreas.get(random.nextInt(profAreas.size())));
            num = random.nextInt(users.size() - 1);
            User owner = users.get(random.nextInt(users.size()));
            project.setOwner(owner);
            owner.getProjectsCreated().add(project.getId());
            List<User> participants = new ArrayList<>();
            for (int i = 0; i < num; i++) {
                User user = users.get(random.nextInt(users.size()));
                if (user != owner && !participants.contains(user)) {
                    participants.add(user);
                    user.getProjectsParticipated().add(project.getId());
                }
            }
            project.setParticipants(participants);
            project.setDescription(RandomStringUtils.randomAlphabetic(length));
            List<Tag> relatedTags = new ArrayList<>();
            num = random.nextInt(tags.size());
            for (int i = 0; i < num; i++) {
                Tag tag = tags.get(random.nextInt(tags.size()));
                if (!relatedTags.contains(tag))
                    relatedTags.add(tag);
            }
            num = random.nextInt(cities.size());
            project.setCity(cities.get(num));
            projects.add(project);
        }
    }

    private void initProfAreas() throws IOException {
        Files.lines(Paths.get(PREFIX + "profarea-names.txt"))
                .forEach(name -> {
                    ProfArea profArea = new ProfArea();
                    profArea.setId(UUID.randomUUID());
                    profArea.setName(name);
                    profAreas.add(profArea);
                });
    }

    private void initTags() throws IOException {
        Files.lines(Paths.get(PREFIX + "tags.txt"))
                .forEach(name -> {
                    Tag tag = new Tag();
                    tag.setId(UUID.randomUUID());
                    tag.setName(name);
                    tags.add(tag);
                });
    }
}
