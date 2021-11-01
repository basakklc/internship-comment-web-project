package com.yorumpaylasimuygulamasi.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.yorumpaylasimuygulamasi.ws.error.ApiError;
import com.yorumpaylasimuygulamasi.ws.user.User;
import com.yorumpaylasimuygulamasi.ws.user.UserRepository;

@Service
public class UserAuthService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User inDB = userRepository.findByUsername(username);

		if(inDB == null) {
			throw new UsernameNotFoundException("User not found ");
		}
		return inDB;
	}

}
