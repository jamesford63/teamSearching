package com.example.server.repository;

import com.example.server.entity.Tag;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface TagRepository
        extends ElasticsearchRepository<Tag, UUID>, PagingAndSortingRepository<Tag, UUID> {
}
