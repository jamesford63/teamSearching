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
@Document(indexName = "admin", shards = 1)
public class Admin {
    @Id
    private UUID id;
    private String login;
    private String password;
}
