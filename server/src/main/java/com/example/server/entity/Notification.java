package com.example.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.UUID;

@Data
@ToString
@EqualsAndHashCode
@Document(indexName = "notification", shards = 1)
public class Notification {
    @Id
    private UUID id;
    private NotificationType type;
    private User from;
    private User to;
    private NotificationStatus status;
    private String description;
}
