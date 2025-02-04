package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.UserRequest;
import com.bookmymovie.dto.UserResponse;
import com.bookmymovie.model.User;

public interface UserService {

	List<UserResponse> getAllUsers();
	
	User getUserById(Long userId);

	ApiResponse updateUser(Long userId, UserRequest updatedUser);
	
	ApiResponse deleteUser(Long userId);
}
