package com.yorumpaylasimuygulamasi.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.yorumpaylasimuygulamasi.ws.user.User;
import com.yorumpaylasimuygulamasi.ws.user.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	
	@Bean
	CommandLineRunner createInitialUsers(UserService userservice) { //CommandLineRunner tipinde bean görünce run metodunu çağırıyor
		
		return (args) -> {
			
			for(int i=0;i<25;i++) {
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("P4ssword");
				
				userservice.save(user);
				
			}
				
			};
	}
}
