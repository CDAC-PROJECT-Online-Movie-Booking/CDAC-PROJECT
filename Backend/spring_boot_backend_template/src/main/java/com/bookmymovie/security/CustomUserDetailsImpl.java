package com.bookmymovie.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bookmymovie.models.User;

public class CustomUserDetailsImpl implements UserDetails {

	private User userEntity;
	
	public CustomUserDetailsImpl(User userEntity) {
		super();
		this.userEntity = userEntity;
	}
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of
				(new SimpleGrantedAuthority(
						userEntity.getRole().name()));
	}

	@Override
	public String getPassword() {
		
		return userEntity.getPassword();
	}

	@Override
	public String getUsername() {
		
		return userEntity.getEmail();
	}
	
	public User getUserEntity() {
		return userEntity;
	}


}
