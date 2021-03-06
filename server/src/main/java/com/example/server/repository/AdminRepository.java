package com.example.server.repository;

import com.example.server.entity.Admin;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface AdminRepository extends ElasticsearchRepository<Admin, UUID>, PagingAndSortingRepository<Admin, UUID> {
    Admin findByLogin(String login);
}
