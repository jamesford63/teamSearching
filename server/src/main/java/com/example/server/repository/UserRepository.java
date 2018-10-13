package com.example.server.repository;

import com.example.server.entity.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface UserRepository
        extends ElasticsearchRepository<User, UUID>, PagingAndSortingRepository<User, UUID> {
}
