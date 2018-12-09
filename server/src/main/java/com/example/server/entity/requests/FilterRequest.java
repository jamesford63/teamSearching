package com.example.server.entity.requests;

import com.example.server.entity.ProfArea;
import com.example.server.entity.Tag;
import lombok.Data;

import java.util.List;

@Data
public class FilterRequest {
    String city;
    List<ProfArea> profAreas;
    List<Tag> tags;
    String description;
    String name;
}
