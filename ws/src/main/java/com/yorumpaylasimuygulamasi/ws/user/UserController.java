package com.yorumpaylasimuygulamasi.ws.user;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.yorumpaylasimuygulamasi.ws.error.ApiError;
import com.yorumpaylasimuygulamasi.ws.shared.GenericResponse;
import com.yorumpaylasimuygulamasi.ws.shared.Views;
import com.yorumpaylasimuygulamasi.ws.user.vm.UserUpdateVM;
import com.yorumpaylasimuygulamasi.ws.user.vm.UserVM;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.validation.ValidationErrors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequestMapping("/api/1.0")
public class UserController {
	
	//private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService; 

	@PostMapping("/users") 
	public GenericResponse crateUser(@Valid @RequestBody User user) {

		userService.save(user);	
		return new GenericResponse("user created"); // generic response objesi string jsona dönüşüyor 
	}
	
	@GetMapping("/users") 
	Page<UserVM> getUsers (Pageable page ){

		return userService.getUsers(page).map((user) -> {
				return new UserVM(user);
			
		});
		
	}
	
	@GetMapping("/users/{username}") 
	UserVM getUser (@PathVariable String username ){
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}
	
	@PutMapping("/users/{username}") 
	UserVM updateUser (@RequestBody UserUpdateVM updatedUser, @PathVariable String username ){
		User user = userService.updateUser(username,updatedUser);
		return new UserVM(user);
	}
	
}
