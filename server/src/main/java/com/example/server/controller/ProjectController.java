package com.example.server.controller;

import com.example.server.entity.Project;
import com.example.server.entity.requests.FilterRequest;
import com.example.server.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProjectController {
    private ProjectService projectService;

    @Autowired
    void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getAllProjects() {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Project> getProjectById(@PathVariable UUID id) {
        return new ResponseEntity<>(projectService.getProjectById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable UUID id) {
        return new ResponseEntity<>(projectService.getUserProjects(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/bulk", method = RequestMethod.POST)
    public ResponseEntity<List<Project>> getProjectByIds(@RequestBody List<UUID> ids) {
        return new ResponseEntity<>(projectService.getProjectByIds(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public ResponseEntity<List<Project>> filterProjects(@RequestBody FilterRequest filter) {
        return new ResponseEntity<>(projectService.filterProjects(filter), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return new ResponseEntity<>(projectService.createProject(project), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Project> updateProject(@RequestBody Project project) {
        return new ResponseEntity<>(projectService.updateProject(project), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteProjectById(@PathVariable UUID id) {
        projectService.deleteProjectById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteAllProjects() {
        projectService.deleteAllProjects();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
