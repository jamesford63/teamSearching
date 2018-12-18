package com.example.server.entity;

import com.example.server.entity.enums.ProjectStatus;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;
import java.util.UUID;

@Data
@ToString(exclude = {"participants", "owner"})
@EqualsAndHashCode
@Document(indexName = "project", shards = 1)
public class Project {
    @Id
    private UUID id;
    private String name;
    private List<ProfArea> profArea;
    private List<User> participants;
    private User owner;
    private List<Tag> tags;
    private String description;
    private ProjectStatus projectStatus;
    private String city;
}
