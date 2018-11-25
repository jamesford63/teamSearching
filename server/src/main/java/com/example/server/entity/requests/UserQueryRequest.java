package com.example.server.entity.requests;

import com.example.server.entity.ProfArea;
import lombok.Data;

import java.util.List;

@Data
public class UserQueryRequest {
    String city;
    List<ProfArea> profAreas;
    List<String> tags;
    String description;
    String name;
}
