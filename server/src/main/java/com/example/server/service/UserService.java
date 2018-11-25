package com.example.server.service;

import com.example.server.entity.ProfArea;
import com.example.server.entity.User;
import com.example.server.entity.requests.UserQueryRequest;
import com.example.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Component
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private Client client;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, Client client) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.client = client;
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
        User user = userRepository.findById(userId).orElse(null);
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        savedUser = userRepository.save(user);
        log.info("Request to save user. END - SUCCESS. Id = {}", savedUser.getId());

        return savedUser;
    }

    public User updateUser(User user) {
        log.info("Request to update user with id = {}. BEGIN", user.getId());
        User existedUser = userRepository.findById(user.getId()).orElse(null);
        if (user.getName() != null)
            existedUser.setName(user.getName());
        if (user.getLastName() != null)
            existedUser.setLastName(user.getLastName());
        if (user.getCity() != null)
            existedUser.setCity(user.getCity());
        if (user.getDescription() != null)
            existedUser.setDescription(user.getDescription());
        if (user.getEmail() != null)
            existedUser.setEmail(user.getEmail());
        if (user.getPassword() != null)
            existedUser.setPassword(passwordEncoder.encode(user.getPassword()));
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

    public List<User> filterUsers(UserQueryRequest filter) {
        log.info("Request to get all users matching filter: {}. BEGIN", filter);
        List<User> users = new ArrayList<>();
        if (filter != null) {
            String tags = "", profAreasNames = "";
            if (filter.getTags() != null && !filter.getTags().isEmpty())
                tags = String.join(" ", filter.getTags());
            if (filter.getProfAreas() != null && !filter.getProfAreas().isEmpty())
                profAreasNames = filter.getProfAreas()
                        .stream().map(ProfArea::getName).collect(Collectors.joining(" "));
            users = userRepository.filterUsers(
                    profAreasNames,
                    tags,
                    filter.getCity(),
                    filter.getDescription(),
                    filter.getName());
        } else {
            userRepository.findAll().forEach(users::add);
        }
        log.info("Request to get all users matching filter. END - SUCCESS");
        return users;
    }
}
