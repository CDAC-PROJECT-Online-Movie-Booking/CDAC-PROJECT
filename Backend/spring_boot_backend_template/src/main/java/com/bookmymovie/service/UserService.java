package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.model.User;

public interface UserService {

	List<User> getAllUsers();
	
	User getUserById(Long userId);

	User updateUser(Long userId, User updatedUser);
	
	void deleteUser(Long userId);
}
