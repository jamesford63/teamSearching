package com.example.server.repository;

import com.example.server.entity.Notification;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface NotificationRepository
        extends ElasticsearchRepository<Notification, UUID>, PagingAndSortingRepository<Notification, UUID> {
}
