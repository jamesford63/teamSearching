package com.example.server.controller;

import com.example.server.entity.NotificationType;
import com.example.server.service.NotificationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notification-types")
public class NotificationTypeController {
	private NotificationTypeService notificationTypeService;

	@Autowired
	void setNotificationTypeService(NotificationTypeService notificationTypeService) {
		this.notificationTypeService = notificationTypeService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<NotificationType>> getAllNotificationTypes() {
		return new ResponseEntity<>(notificationTypeService.getAllNotificationTypes(), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<NotificationType> getNotificationTypeById(@PathVariable UUID id) {
		return new ResponseEntity<>(notificationTypeService.getNotificationTypeById(id), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<NotificationType> createNotificationType(@RequestBody NotificationType notificationType) {
		return new ResponseEntity<>(notificationTypeService.createNotificationType(notificationType), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<NotificationType> updateNotificationType(@RequestBody NotificationType notificationType) {
		return new ResponseEntity<>(notificationTypeService.updateNotificationType(notificationType), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteNotificationTypeById(@PathVariable UUID id) {
		notificationTypeService.deleteNotificationTypeById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllNotificationTypes() {
		notificationTypeService.deleteAllNotificationTypes();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
