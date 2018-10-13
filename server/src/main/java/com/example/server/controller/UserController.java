package com.example.server.controller;

import com.example.server.entity.User;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
	private UserService userService;

	@Autowired
	void setUserService(UserService userService) {
		this.userService = userService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<User>> getAllUsers() {
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> getUserById(@PathVariable UUID id) {
		return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User user) {
		return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteUserById(@PathVariable UUID id) {
		userService.deleteUserById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllUsers() {
		userService.deleteAllUsers();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
