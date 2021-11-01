package com.yorumpaylasimuygulamasi.ws.user.vm;


import com.yorumpaylasimuygulamasi.ws.user.User;

import lombok.Data;

@Data
public class UserVM {

	private String username;
	
	private String displayName;
	
	private String image;
	
	
	public UserVM(User t) {
		this.setDisplayName(t.getDisplayName());
		this.setUsername(t.getUsername());
		this.setImage(t.getImage());
	}
	
}
