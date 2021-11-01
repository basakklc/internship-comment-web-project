package com.yorumpaylasimuygulamasi.ws.user;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.yorumpaylasimuygulamasi.ws.error.NotFoundException;
import com.yorumpaylasimuygulamasi.ws.user.vm.UserUpdateVM;

@Service
public class UserService {
	
	
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder =passwordEncoder;
	}

	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);	
	}
	
	
	public Page<User> getUsers( Pageable page){
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException();
			
		}
		return inDB;
		 
	}

	public User updateUser(String username, UserUpdateVM updatedUser) {
		User inDB = getByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		return userRepository.save(inDB);	
	}
	
}
