package com.example.server.repository;

import com.example.server.entity.Notification;
import com.example.server.entity.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository
        extends ElasticsearchRepository<Notification, UUID>, PagingAndSortingRepository<Notification, UUID> {
    List<Notification> findNotificationsByTo(User to);
}
