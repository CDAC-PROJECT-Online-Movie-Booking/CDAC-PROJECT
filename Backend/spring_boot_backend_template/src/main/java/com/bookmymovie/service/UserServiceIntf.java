package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.UserDTO;
import com.bookmymovie.models.User;

public interface UserServiceIntf {
	public List<User> listall();
	public User findById(int id);
	public User findByEmail(String email);
	public ApiResponse registerNewUser(UserDTO dto);
}
