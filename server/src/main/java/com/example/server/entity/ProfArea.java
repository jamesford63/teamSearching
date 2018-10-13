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
@Document(indexName = "profarea", shards = 1)
public class ProfArea {
    @Id
    private UUID id;
    private String name;
    private List<Tag> relatedTags;
}
