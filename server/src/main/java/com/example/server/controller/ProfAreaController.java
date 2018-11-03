package com.example.server.controller;

import com.example.server.entity.ProfArea;
import com.example.server.service.ProfAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/prof-areas")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProfAreaController {
	private ProfAreaService profAreaService;

	@Autowired
	void setProfAreaService(ProfAreaService profAreaService) {
		this.profAreaService = profAreaService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<ProfArea>> getAllProfAreas() {
		return new ResponseEntity<>(profAreaService.getAllProfAreas(), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ProfArea> getProfAreaById(@PathVariable UUID id) {
		return new ResponseEntity<>(profAreaService.getProfAreaById(id), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ProfArea> createProfArea(@RequestBody ProfArea profArea) {
		return new ResponseEntity<>(profAreaService.createProfArea(profArea), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<ProfArea> updateProfArea(@RequestBody ProfArea profArea) {
		return new ResponseEntity<>(profAreaService.updateProfArea(profArea), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProfAreaById(@PathVariable UUID id) {
		profAreaService.deleteProfAreaById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllProfAreas() {
		profAreaService.deleteAllProfAreas();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
