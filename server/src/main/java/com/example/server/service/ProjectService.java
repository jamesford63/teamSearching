package com.example.server.service;

import com.example.server.entity.ProfArea;
import com.example.server.entity.Project;
import com.example.server.entity.User;
import com.example.server.entity.Tag;
import com.example.server.entity.requests.FilterRequest;
import com.example.server.repository.ProjectRepository;
import com.example.server.repository.UserRepository;
import com.example.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Component
public class ProjectService {
    private ProjectRepository projectRepository;
    private UserRepository userRepository;
    private Client client;

    @Autowired
    public void setProjectRepository(ProjectRepository projectRepository, Client client, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.client = client;
        this.userRepository = userRepository;
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
        Project project = projectRepository.findById(projectId).orElse(null);
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
        if (project.getId() == null)
            project.setId(UUID.randomUUID());
        savedProject = projectRepository.save(project);
        log.info("Request to save project. END - SUCCESS. Id = {}", savedProject.getId());

        return savedProject;
    }

    public Project updateProject(Project project) {
        log.info("Request to update project with id = {}. BEGIN", project.getId());
        Project existedProject = projectRepository.findById(project.getId()).orElse(null);

        if (project.getOwner() != null)
            existedProject.setOwner(project.getOwner());
        if (project.getName() != null)
            existedProject.setName(project.getName());
        if (project.getDescription() != null)
            existedProject.setDescription(project.getDescription());
        if (project.getParticipants() != null)
            existedProject.setParticipants(project.getParticipants());
        if (project.getProfArea() != null)
            existedProject.setProfArea(project.getProfArea());
        if (project.getTags() != null)
            existedProject.setTags(project.getTags());
        if (project.getCity() != null)
            existedProject.setCity(project.getCity());

        project = projectRepository.save(existedProject);

        log.info("Request to update project. END - SUCCESS.");

        return project;
    }

    public List<Project> filterProjects(FilterRequest filter) {
        log.info("Request to get all projects matching filter: {}. BEGIN", filter);
        List<Project> projects = new ArrayList<>();
        if (filter != null) {
            String tags = "", profAreasNames = "";
            if (filter.getTags() != null && !filter.getTags().isEmpty())
                tags = filter.getTags().stream().map(Tag::getName).collect(Collectors.joining(" "));
            if (filter.getProfAreas() != null && !filter.getProfAreas().isEmpty())
                profAreasNames = filter.getProfAreas()
                        .stream().map(ProfArea::getName).collect(Collectors.joining(" "));
            projects = projectRepository.filterProjects(
                    profAreasNames,
                    tags,
                    filter.getName(),
                    filter.getDescription(),
                    filter.getCity());
        } else {
            projectRepository.findAll().forEach(projects::add);
        }
        log.info("Request to get all projects matching filter. END - SUCCESS");
        return projects;
    }

    public List<Project> getProjectByIds(List<UUID> ids) {
        log.info("Request to get all projects with ids: {}. BEGIN", ids);
        List<Project> result = new ArrayList<>();
        projectRepository.findAllById(ids).forEach(result::add);
        log.info("Request to get all projects with ids. END - SUCCESS");
        return result;
    }

    public List<Project> getUserProjects(UUID userId) {
        log.info("Request to get projects of user with id = {}. BEGIN", userId);
        //User user = userRepository.findById(userId).orElse(null);
        List<Project> projects = projectRepository.findProjectsByOwner_Id(userId);
        log.info("Request to get projects of user with id. END - SUCCESS.");

        return projects;
    }
}
