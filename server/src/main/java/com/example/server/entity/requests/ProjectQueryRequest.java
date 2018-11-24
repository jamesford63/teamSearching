package com.example.server.entity.requests;

import com.example.server.entity.ProfArea;
import lombok.Data;

import java.util.List;

@Data
public class ProjectQueryRequest {
    String name;
    List<ProfArea> profAreas;
    List<String> tags;
    String description;
}
