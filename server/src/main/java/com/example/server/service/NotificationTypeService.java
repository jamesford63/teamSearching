package com.example.server.service;

import com.example.server.entity.NotificationType;
import com.example.server.repository.NotificationTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class NotificationTypeService {
    private NotificationTypeRepository notificationTypeRepository;

    @Autowired
    public void setNotificationTypeRepository(NotificationTypeRepository notificationTypeRepository) {
        this.notificationTypeRepository = notificationTypeRepository;
    }

    public List<NotificationType> getAllNotificationTypes() {
        log.info("Request to get all notificationTypes. BEGIN");
        List<NotificationType> notificationTypes = new ArrayList<>();
        notificationTypeRepository.findAll().forEach(notificationTypes::add);
        log.info("Request to get all notificationTypes. END - SUCCESS. Size: {}", notificationTypes.size());

        return notificationTypes;
    }

    public NotificationType getNotificationTypeById(UUID notificationTypeId) {
        log.info("Request to get notificationType type by id = {}. BEGIN", notificationTypeId);
        NotificationType notificationType = notificationTypeRepository.findById(notificationTypeId).get();
        log.info("Request to get notificationType by id. END - SUCCESS.");

        return notificationType;
    }

    public void deleteNotificationTypeById(UUID notificationTypeId) {
        log.info("Request to delete notificationType by id = {}. BEGIN", notificationTypeId);
        NotificationType notificationTypeToDelete = new NotificationType();
        notificationTypeToDelete.setId(notificationTypeId);
        notificationTypeRepository.delete(notificationTypeToDelete);
        log.info("Request to delete notificationType by id. END - SUCCESS.");
    }

    public void deleteAllNotificationTypes() {
        log.info("Request to delete all notificationTypes. BEGIN");
        notificationTypeRepository.deleteAll();
        log.info("Request to delete all notificationTypes. END - SUCCESS.");
    }

    public NotificationType createNotificationType(NotificationType notificationType) {
        log.info("Request to save notificationType. BEGIN");
        NotificationType savedNotificationType;
        if(notificationType.getId() == null)
            notificationType.setId(UUID.randomUUID());
        savedNotificationType = notificationTypeRepository.save(notificationType);
        log.info("Request to save notificationType. END - SUCCESS. Id = {}", savedNotificationType.getId());

        return savedNotificationType;
    }

    public NotificationType updateNotificationType(NotificationType notificationType) {
        log.info("Request to update notificationType with id = {}. BEGIN", notificationType.getId());
        NotificationType existedNotificationType = notificationTypeRepository.findById(notificationType.getId()).get();
        if(notificationType.getName() != null)
            existedNotificationType.setName(notificationType.getName());
        notificationType = notificationTypeRepository.save(existedNotificationType);
        log.info("Request to update notificationType. END - SUCCESS.");

        return notificationType;
    }
}
