package com.yorumpaylasimuygulamasi.ws.auth;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.yorumpaylasimuygulamasi.ws.configuration.YorumPaylasimUserDetails;
import com.yorumpaylasimuygulamasi.ws.error.ApiError;
import com.yorumpaylasimuygulamasi.ws.shared.Views;
import com.yorumpaylasimuygulamasi.ws.user.User;
import com.yorumpaylasimuygulamasi.ws.user.UserRepository;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(Authentication authentication) {
		
		User user = (User) authentication.getPrincipal();
		return ResponseEntity.ok(user);

	}
}
