package com.example.server.repository;

import com.example.server.entity.NotificationType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface NotificationTypeRepository
        extends ElasticsearchRepository<NotificationType, UUID>, PagingAndSortingRepository<NotificationType, UUID> {
}
