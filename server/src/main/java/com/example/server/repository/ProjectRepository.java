package com.example.server.repository;

import com.example.server.entity.Project;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ProjectRepository
        extends ElasticsearchRepository<Project, Long>, PagingAndSortingRepository<Project, Long> {
    Project findById(UUID id);
}
