package com.example.server.repository;

import com.example.server.entity.User;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository
        extends ElasticsearchRepository<User, UUID>, PagingAndSortingRepository<User, UUID> {
    User findByLogin(String login);

    @Query("{\n" +
            "    \t\"bool\" : {\n" +
            "    \t\t\"should\": [\n" +
            "        {\"query_string\" : {\n" +
            "            \"fields\" : [\"profAreas.name\"],\n" +
            "            \"default_operator\" : \"AND\",\n" +
            "            \"query\" : \"?0\",\n" +
            "            \"analyze_wildcard\" : \"true\",\n" +
            "            \"lenient\" : \"true\"\n" +
            "        }\n" +
            "        }, {\n" +
            "        \t\"query_string\" : {\n" +
            "            \"fields\" : [\"tags.name\"],\n" +
            "            \"default_operator\" : \"AND\",\n" +
            "            \"query\" : \"?1\",\n" +
            "            \"analyze_wildcard\" : \"true\",\n" +
            "            \"lenient\" : \"true\"\n" +
            "        }\n" +
            "        }, {\n" +
            "        \t\"match\" : {\n" +
            "            \"city\" : {\n" +
            "            \t\"query\":\"?2\",\n" +
            "            \t\"operator\": \"OR\",\n" +
            "            \t \"minimum_should_match\": \"50%\",\n" +
            "            \t \"zero_terms_query\": \"none\",\n" +
            "            \t \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "        }\n" +
            "        }, {\n" +
            "        \t\"match\" : {\n" +
            "            \"description\" : {\n" +
            "            \t\"query\":\"?3\",\n" +
            "            \t\"operator\": \"OR\",\n" +
            "            \t \"minimum_should_match\": \"1\",\n" +
            "            \t \"zero_terms_query\": \"none\",\n" +
            "            \t \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "        }\n" +
            "        }, {\n" +
            "        \t\"match\" : {\n" +
            "            \"name\" : {\n" +
            "            \t\"query\":\"?4\",\n" +
            "            \t\"operator\": \"OR\",\n" +
            "            \t \"minimum_should_match\": \"1\",\n" +
            "            \t \"zero_terms_query\": \"none\",\n" +
            "            \t \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "        }\n" +
            "        },{\n" +
            "        \t\"match\" : {\n" +
            "            \"lastName\" : {\n" +
            "            \t\"query\":\"?4\",\n" +
            "            \t\"operator\": \"OR\",\n" +
            "            \t \"minimum_should_match\": \"1\",\n" +
            "            \t \"zero_terms_query\": \"none\",\n" +
            "            \t \"fuzziness\": \"AUTO:3,4\"\n" +
            "            }\n" +
            "        }\n" +
            "        }\n" +
            "    \t\t]\n" +
            "    }\n" +
            "}")
    List<User> filterUsers(String profAreasNames, String tags, String city, String description, String name);
}
