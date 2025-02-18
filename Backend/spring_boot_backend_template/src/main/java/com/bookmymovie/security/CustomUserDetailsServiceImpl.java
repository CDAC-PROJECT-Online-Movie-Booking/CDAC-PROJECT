package com.bookmymovie.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bookmymovie.models.User;
import com.bookmymovie.repos.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService
 {

	@Autowired
	private UserRepository userEntityRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userEntityRepository.findByEmail(username).orElseThrow( ()-> new UsernameNotFoundException("Email not found exception") );
		
		return new CustomUserDetailsImpl(userEntity);
 	}
	
}
