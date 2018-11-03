package com.example.server.service;

import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setUserRepository(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        log.info("Request to get all users. BEGIN");
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        log.info("Request to get all users. END - SUCCESS. Size: {}", users.size());

        return users;
    }

    public User getUserById(UUID userId) {
        log.info("Request to get user by id = {}. BEGIN", userId);
        User user = userRepository.findById(userId).get();
        log.info("Request to get user by id. END - SUCCESS.");

        return user;
    }

    public void deleteUserById(UUID userId) {
        log.info("Request to delete user by id = {}. BEGIN", userId);
        User userToDelete = new User();
        userToDelete.setId(userId);
        userRepository.delete(userToDelete);
        log.info("Request to delete user by id. END - SUCCESS.");
    }

    public void deleteAllUsers() {
        log.info("Request to delete all users. BEGIN");
        userRepository.deleteAll();
        log.info("Request to delete all users. END - SUCCESS.");
    }

    public User createUser(User user) {
        log.info("Request to save user. BEGIN");
        User savedUser;
        if (user.getId() == null)
            user.setId(UUID.randomUUID());
        savedUser = userRepository.save(user);
        log.info("Request to save user. END - SUCCESS. Id = {}", savedUser.getId());

        return savedUser;
    }

    public User updateUser(User user) {
        log.info("Request to update user with id = {}. BEGIN", user.getId());
        User existedUser = userRepository.findById(user.getId()).get();
        if (user.getName() != null)
            existedUser.setName(user.getName());
        user = userRepository.save(existedUser);
        log.info("Request to update user. END - SUCCESS.");

        return user;
    }

    public User getUserByLogin(String login) {
        log.info("Request to get user by login = {}. BEGIN", login);
        User user = userRepository.findByLogin(login);
        log.info("Request to get user by login. END - SUCCESS.");

        return user;
    }
}
