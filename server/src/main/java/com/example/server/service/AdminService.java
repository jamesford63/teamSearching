package com.example.server.service;

import com.example.server.entity.Admin;
import com.example.server.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class AdminService {
    private AdminRepository adminRepository;

    @Autowired
    public void setAdminRepository(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        log.info("Request to get all admins. BEGIN");
        List<Admin> admins = new ArrayList<>();
        adminRepository.findAll().forEach(admins::add);
        log.info("Request to get all admins. END - SUCCESS. Size: {}", admins.size());

        return admins;
    }

    public Admin getAdminById(UUID adminId) {
        log.info("Request to get admin by id = {}. BEGIN", adminId);
        Admin admin = adminRepository.findById(adminId).get();
        log.info("Request to get admin by id. END - SUCCESS.");

        return admin;
    }

    public void deleteAdminById(UUID adminId) {
        log.info("Request to delete admin by id = {}. BEGIN", adminId);
        Admin adminToDelete = new Admin();
        adminToDelete.setId(adminId);
        adminRepository.delete(adminToDelete);
        log.info("Request to delete admin by id. END - SUCCESS.");
    }

    public void deleteAllAdmins() {
        log.info("Request to delete all admins. BEGIN");
        adminRepository.deleteAll();
        log.info("Request to delete all admins. END - SUCCESS.");
    }

    public Admin createAdmin(Admin admin) {
        log.info("Request to save admin. BEGIN");
        Admin savedAdmin;
        if(admin.getId() == null)
            admin.setId(UUID.randomUUID());
        savedAdmin = adminRepository.save(admin);
        log.info("Request to save admin. END - SUCCESS. Id = {}", savedAdmin.getId());

        return savedAdmin;
    }

    public Admin updateAdmin(Admin admin) {
        log.info("Request to update admin with id = {}. BEGIN", admin.getId());
        Admin existedAdmin = adminRepository.findById(admin.getId()).get();
        if(admin.getLogin() != null)
            existedAdmin.setLogin(admin.getLogin());
        if(admin.getPassword() != null)
            existedAdmin.setPassword(admin.getPassword());
        admin = adminRepository.save(existedAdmin);
        log.info("Request to update admin. END - SUCCESS.");

        return admin;
    }

    public Admin getAdminByLogin(String login) {
        log.info("Request to get admin by login = {}. BEGIN", login);
        Admin admin = adminRepository.findByLogin(login);
        log.info("Request to get admin by login. END - SUCCESS.");

        return admin;
    }
}
