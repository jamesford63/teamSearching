package com.example.server.service;

import com.example.server.entity.Project;
import com.example.server.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class ProjectService {
    private ProjectRepository projectRepository;

    @Autowired
    public void setProjectRepository(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        log.info("Request to get all projects. BEGIN");
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll().forEach(projects::add);
        log.info("Request to get all projects. END - SUCCESS. Size: {}", projects.size());

        return projects;
    }

    public Project getProjectById(UUID projectId) {
        log.info("Request to get project by id = {}. BEGIN", projectId);
        Project project = projectRepository.findById(projectId).get();
        log.info("Request to get project by id. END - SUCCESS.");

        return project;
    }

    public void deleteProjectById(UUID projectId) {
        log.info("Request to delete project by id = {}. BEGIN", projectId);
        Project projectToDelete = new Project();
        projectToDelete.setId(projectId);
        projectRepository.delete(projectToDelete);
        log.info("Request to delete project by id. END - SUCCESS.");
    }

    public void deleteAllProjects() {
        log.info("Request to delete all projects. BEGIN");
        projectRepository.deleteAll();
        log.info("Request to delete all projects. END - SUCCESS.");
    }

    public Project createProject(Project project) {
        log.info("Request to save project. BEGIN");
        Project savedProject;
        if(project.getId() == null)
            project.setId(UUID.randomUUID());
        savedProject = projectRepository.save(project);
        log.info("Request to save project. END - SUCCESS. Id = {}", savedProject.getId());

        return savedProject;
    }

    public Project updateProject(Project project) {
        log.info("Request to update project with id = {}. BEGIN", project.getId());
        Project existedProject = projectRepository.findById(project.getId()).get();
        if(project.getOwner() != null)
            existedProject.setOwner(project.getOwner());
        if(project.getName() != null)
            existedProject.setName(project.getName());
        if(project.getDescription() != null)
            existedProject.setDescription(project.getDescription());
        if(project.getParticipants() != null)
            existedProject.setParticipants(project.getParticipants());
        if(project.getProfArea() != null)
            existedProject.setProfArea(project.getProfArea());
        if(project.getTags() != null)
            existedProject.setTags(project.getTags());
        project = projectRepository.save(existedProject);
        log.info("Request to update project. END - SUCCESS.");

        return project;
    }
}
