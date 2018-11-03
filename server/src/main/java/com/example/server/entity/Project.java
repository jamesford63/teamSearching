package com.example.server.entity;

import com.example.server.entity.enums.ProjectStatus;
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
@Document(indexName = "project", shards = 1)
public class Project {
    @Id
    private UUID id;
    private String name;
    private ProfArea profArea;
    private List<User> participants;
    private User owner;
    private List<Tag> tags;
    private String description;
    private ProjectStatus projectStatus;
}
