package com.example.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;
import java.util.UUID;

@Data
@ToString
@EqualsAndHashCode
@Document(indexName = "user", shards = 1)
public class User {
    @Id
    private UUID id;
    private String login;
    private String password;
    private String email;
    private String name;
    private String lastName;
    private String city;
    private List<ProfArea> profAreas;
    private List<Project> projectsCreated;
    private List<Project> projectsParticipated;
    private UserStatus userStatus;
    private String description;
}
