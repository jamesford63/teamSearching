package com.example.server.controller;

import com.example.server.entity.Notification;
import com.example.server.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = {"http://localhost:4200"})
public class NotificationController {
	private NotificationService notificationService;

	@Autowired
	void setNotificationService(NotificationService notificationService) {
		this.notificationService = notificationService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Notification>> getAllNotifications() {
		return new ResponseEntity<>(notificationService.getAllNotifications(), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Notification> getNotificationById(@PathVariable UUID id) {
		return new ResponseEntity<>(notificationService.getNotificationById(id), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
		return new ResponseEntity<>(notificationService.createNotification(notification), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Notification> updateNotification(@RequestBody Notification notification) {
		return new ResponseEntity<>(notificationService.updateNotification(notification), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteNotificationById(@PathVariable UUID id) {
		notificationService.deleteNotificationById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllNotifications() {
		notificationService.deleteAllNotifications();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
