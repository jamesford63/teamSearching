package com.example.server.service.security;

import com.example.server.entity.Admin;
import com.example.server.entity.User;
import com.example.server.entity.enums.UserRole;
import com.example.server.service.AdminService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private AdminService adminService;
    private UserService userService;

    @Autowired
    public UserDetailsServiceImpl(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Set<GrantedAuthority> roles = new HashSet<>();
        UserDetails userDetails = null;
        try {
            User user = userService.getUserByLogin(login);
            roles.add(new SimpleGrantedAuthority(UserRole.USER.name()));
            userDetails =
                    new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), roles);
        } catch (Exception ignored) {
            Admin admin = adminService.getAdminByLogin(login);
            roles.add(new SimpleGrantedAuthority(UserRole.ADMIN.name()));
            userDetails =
                    new org.springframework.security.core.userdetails.User(admin.getLogin(), admin.getPassword(), roles);
        }

        return userDetails;
    }
}
