package com.bookmymovie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.model.User;
import com.bookmymovie.repository.UserRepository;


public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
				
	}

	@Override
	public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }


}
