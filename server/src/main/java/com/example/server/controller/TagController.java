package com.example.server.controller;

import com.example.server.entity.Tag;
import com.example.server.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tags")
@CrossOrigin(origins = {"http://localhost:4200"})
public class TagController {
    private TagService tagService;

    @Autowired
    void setTagService(TagService tagService) {
        this.tagService = tagService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Tag>> getAllTags() {
        return new ResponseEntity<>(tagService.getAllTags(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Tag> getTagById(@PathVariable UUID id) {
        return new ResponseEntity<>(tagService.getTagById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public ResponseEntity<Tag> getTagByName(@PathVariable String name) {
        return new ResponseEntity<>(tagService.getTagByName(name), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        return new ResponseEntity<>(tagService.createTag(tag), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Tag> updateTag(@RequestBody Tag tag) {
        return new ResponseEntity<>(tagService.updateTag(tag), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteTagById(@PathVariable UUID id) {
        tagService.deleteTagById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteAllTags() {
        tagService.deleteAllTags();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
