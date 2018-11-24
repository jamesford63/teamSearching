package com.example.server.service;

import com.example.server.entity.ProfArea;
import com.example.server.repository.ProfAreaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class ProfAreaService {
    private ProfAreaRepository profAreaRepository;

    @Autowired
    public void setProfAreaRepository(ProfAreaRepository profAreaRepository) {
        this.profAreaRepository = profAreaRepository;
    }

    public List<ProfArea> getAllProfAreas() {
        log.info("Request to get all profAreas. BEGIN");
        List<ProfArea> profAreas = new ArrayList<>();
        profAreaRepository.findAll().forEach(profAreas::add);
        log.info("Request to get all profAreas. END - SUCCESS. Size: {}", profAreas.size());

        return profAreas;
    }

    public ProfArea getProfAreaById(UUID profAreaId) {
        log.info("Request to get profArea by id = {}. BEGIN", profAreaId);
        ProfArea profArea = profAreaRepository.findById(profAreaId).get();
        log.info("Request to get profArea by id. END - SUCCESS.");

        return profArea;
    }

    public void deleteProfAreaById(UUID profAreaId) {
        log.info("Request to delete profArea by id = {}. BEGIN", profAreaId);
        ProfArea profAreaToDelete = new ProfArea();
        profAreaToDelete.setId(profAreaId);
        profAreaRepository.delete(profAreaToDelete);
        log.info("Request to delete profArea by id. END - SUCCESS.");
    }

    public void deleteAllProfAreas() {
        log.info("Request to delete all profAreas. BEGIN");
        profAreaRepository.deleteAll();
        log.info("Request to delete all profAreas. END - SUCCESS.");
    }

    public ProfArea createProfArea(ProfArea profArea) {
        log.info("Request to save profArea. BEGIN");
        ProfArea savedProfArea;
        if(profArea.getId() == null)
            profArea.setId(UUID.randomUUID());
        savedProfArea = profAreaRepository.save(profArea);
        log.info("Request to save profArea. END - SUCCESS. Id = {}", savedProfArea.getId());

        return savedProfArea;
    }

    public ProfArea updateProfArea(ProfArea profArea) {
        log.info("Request to update profArea with id = {}. BEGIN", profArea.getId());
        ProfArea existedProfArea = profAreaRepository.findById(profArea.getId()).get();
        if(profArea.getName() != null)
            existedProfArea.setName(profArea.getName());
        profArea = profAreaRepository.save(existedProfArea);
        log.info("Request to update profArea. END - SUCCESS.");

        return profArea;
    }
}
