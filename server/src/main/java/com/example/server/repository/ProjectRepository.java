package com.example.server.repository;

import com.example.server.entity.Project;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

//TODO change filters
public interface ProjectRepository
        extends ElasticsearchRepository<Project, UUID>, PagingAndSortingRepository<Project, UUID> {
    @Query("{\n" +
            "  \"query\": {\n" +
            "    \"bool\": {\n" +
            "      \"should\": [\n" +
            "        {\n" +
            "          \"query_string\": {\n" +
            "            \"fields\": [\n" +
            "              \"profArea.name\"\n" +
            "            ],\n" +
            "            \"default_operator\": \"AND\",\n" +
            "            \"query\": \"?0\",\n" +
            "            \"analyze_wildcard\": \"true\",\n" +
            "            \"lenient\": \"true\"\n" +
            "          }\n" +
            "        },\n" +
            "        {\n" +
            "          \"query_string\": {\n" +
            "            \"fields\": [\n" +
            "              \"tags.name\"\n" +
            "            ],\n" +
            "            \"default_operator\": \"AND\",\n" +
            "            \"query\": \"?1\",\n" +
            "            \"analyze_wildcard\": \"true\",\n" +
            "            \"lenient\": \"true\"\n" +
            "          }\n" +
            "        },\n" +
            "        {\n" +
            "          \"match\": {\n" +
            "            \"name\": {\n" +
            "              \"query\": \"?2\",\n" +
            "              \"operator\": \"OR\",\n" +
            "              \"minimum_should_match\": \"50%\",\n" +
            "              \"zero_terms_query\": \"none\",\n" +
            "              \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "          }\n" +
            "        },\n" +
            "        {\n" +
            "          \"match\": {\n" +
            "            \"description\": {\n" +
            "              \"query\": \"?3\",\n" +
            "              \"operator\": \"OR\",\n" +
            "              \"minimum_should_match\": \"1\",\n" +
            "              \"zero_terms_query\": \"none\",\n" +
            "              \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "          }\n" +
            "        },\n" +
            "        {\n" +
            "          \"match\": {\n" +
            "            \"city\": {\n" +
            "              \"query\": \"?4\",\n" +
            "              \"operator\": \"OR\",\n" +
            "              \"minimum_should_match\": \"1\",\n" +
            "              \"zero_terms_query\": \"none\",\n" +
            "              \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "          }\n" +
            "        }\n" +
            "      ]\n" +
            "    }\n" +
            "  }\n" +
            "}")
    List<Project> filterProjects(String profAreasNames, String tags, String name, String description, String city);
}
