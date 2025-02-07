package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.OtpVerificationRequest;
import com.bookmymovie.dto.UserRequest;
import com.bookmymovie.dto.UserResponse;
import com.bookmymovie.model.User;

public interface UserService {
	
	public ApiResponse registerUser(UserRequest user);

	List<UserResponse> getAllUsers();
	
	UserResponse getUserById(Long userId);

	ApiResponse updateUser(Long userId, UserRequest updatedUser);
	
	ApiResponse deleteUser(Long userId);
	
    ApiResponse verifyOtp(OtpVerificationRequest request);
    
    String generateOtp();
}
