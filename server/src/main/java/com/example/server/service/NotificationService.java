package com.example.server.service;

import com.example.server.entity.Notification;
import com.example.server.entity.User;
import com.example.server.repository.NotificationRepository;
import com.example.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class NotificationService {
    private NotificationRepository notificationRepository;
    private UserRepository userRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public List<Notification> getAllNotifications() {
        log.info("Request to get all notifications. BEGIN");
        List<Notification> notifications = new ArrayList<>();
        notificationRepository.findAll().forEach(notifications::add);
        log.info("Request to get all notifications. END - SUCCESS. Size: {}", notifications.size());

        return notifications;
    }

    public Notification getNotificationById(UUID notificationId) {
        log.info("Request to get notification by id = {}. BEGIN", notificationId);
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        log.info("Request to get notification by id. END - SUCCESS.");

        return notification;
    }

    public void deleteNotificationById(UUID notificationId) {
        log.info("Request to delete notification by id = {}. BEGIN", notificationId);
        Notification notificationToDelete = new Notification();
        notificationToDelete.setId(notificationId);
        notificationRepository.delete(notificationToDelete);
        log.info("Request to delete notification by id. END - SUCCESS.");
    }

    public void deleteAllNotifications() {
        log.info("Request to delete all notifications. BEGIN");
        notificationRepository.deleteAll();
        log.info("Request to delete all notifications. END - SUCCESS.");
    }

    public Notification createNotification(Notification notification) {
        log.info("Request to save notification. BEGIN");
        Notification savedNotification;
        if (notification.getId() == null)
            notification.setId(UUID.randomUUID());
        savedNotification = notificationRepository.save(notification);
        log.info("Request to save notification. END - SUCCESS. Id = {}", savedNotification.getId());

        return savedNotification;
    }

    public Notification updateNotification(Notification notification) {
        log.info("Request to update notification with id = {}. BEGIN", notification.getId());
        Notification existedNotification = notificationRepository.findById(notification.getId()).orElse(null);
        if (notification.getDescription() != null)
            existedNotification.setDescription(notification.getDescription());
        if (notification.getFrom() != null)
            existedNotification.setFrom(notification.getFrom());
        if (notification.getTo() != null)
            existedNotification.setFrom(notification.getTo());
        if (notification.getStatus() != null)
            existedNotification.setStatus(notification.getStatus());
        if (notification.getType() != null)
            existedNotification.setType(notification.getType());
        if (notification.getProject() != null)
            existedNotification.setProject(notification.getProject());
        notification = notificationRepository.save(existedNotification);
        log.info("Request to update notification. END - SUCCESS.");

        return notification;
    }

    public List<Notification> getUserNotifications(UUID userId) {
        log.info("Request to get notifications of user with id = {}. BEGIN", userId);
        User user = userRepository.findById(userId).orElse(null);
        List<Notification> notifications = notificationRepository.findNotificationsByTo(user);
        log.info("Request to get notifications of user with id. END - SUCCESS.");

        return notifications;
    }
}
