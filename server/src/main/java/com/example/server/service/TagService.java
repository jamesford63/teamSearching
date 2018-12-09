package com.example.server.service;

import com.example.server.entity.Tag;
import com.example.server.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class TagService {
    private TagRepository tagRepository;

    @Autowired
    public void setTagRepository(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTags() {
        log.info("Request to get all tags. BEGIN");
        List<Tag> tags = new ArrayList<>();
        tagRepository.findAll().forEach(tags::add);
        log.info("Request to get all tags. END - SUCCESS. Size: {}", tags.size());

        return tags;
    }

    public Tag getTagById(UUID tagId) {
        log.info("Request to get tag by id = {}. BEGIN", tagId);
        Tag tag = tagRepository.findById(tagId).get();
        log.info("Request to get tag by id. END - SUCCESS.");

        return tag;
    }

    public Tag getTagByName(String tagName) {
        log.info("Request to get tag by name = {}. BEGIN", tagName);
        Tag tag = tagRepository.findByName(tagName).get();
        log.info("Request to get tag by name. END - SUCCESS.");

        return tag;
    }

    public void deleteTagById(UUID tagId) {
        log.info("Request to delete tag by id = {}. BEGIN", tagId);
        Tag tagToDelete = new Tag();
        tagToDelete.setId(tagId);
        tagRepository.delete(tagToDelete);
        log.info("Request to delete tag by id. END - SUCCESS.");
    }

    public void deleteAllTags() {
        log.info("Request to delete all tags. BEGIN");
        tagRepository.deleteAll();
        log.info("Request to delete all tags. END - SUCCESS.");
    }

    public Tag createTag(Tag tag) {
        log.info("Request to save tag. BEGIN");
        Tag savedTag;
        if(tag.getId() == null)
            tag.setId(UUID.randomUUID());
        savedTag = tagRepository.save(tag);
        log.info("Request to save tag. END - SUCCESS. Id = {}", savedTag.getId());

        return savedTag;
    }

    public Tag updateTag(Tag tag) {
        log.info("Request to update tag with id = {}. BEGIN", tag.getId());
        Tag existedTag = tagRepository.findById(tag.getId()).get();
        if(tag.getName() != null)
            existedTag.setName(tag.getName());
        tag = tagRepository.save(existedTag);
        log.info("Request to update tag. END - SUCCESS.");

        return tag;
    }
}
