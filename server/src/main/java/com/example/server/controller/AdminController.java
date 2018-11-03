package com.example.server.controller;

import com.example.server.entity.Admin;
import com.example.server.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/admins")
public class AdminController {
    private AdminService adminService;

    @Autowired
    void setAdminService(AdminService adminService) {
        this.adminService = adminService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Admin> getAdminById(@PathVariable UUID id) {
        return new ResponseEntity<>(adminService.getAdminById(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        return new ResponseEntity<>(adminService.createAdmin(admin), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin) {
        return new ResponseEntity<>(adminService.updateAdmin(admin), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteAdminById(@PathVariable UUID id) {
        adminService.deleteAdminById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteAllAdmins() {
        adminService.deleteAllAdmins();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
