package com.example.server.repository;

import com.example.server.entity.ProfArea;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ProfAreaRepository
        extends ElasticsearchRepository<ProfArea, UUID>, PagingAndSortingRepository<ProfArea, UUID> {
}
