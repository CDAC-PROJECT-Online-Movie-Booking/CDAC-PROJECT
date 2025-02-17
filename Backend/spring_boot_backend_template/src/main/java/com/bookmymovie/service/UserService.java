package com.bookmymovie.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookmymovie.custom_exceptions.ApiException;
import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.LoginDTO;
import com.bookmymovie.dto.UserDTO;
import com.bookmymovie.models.User;
import com.bookmymovie.repository.UserRepository;

@Service
public class UserService {

	@Autowired 
	private UserRepository repo;
	@Autowired 
	private ModelMapper modelMapper;
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
//	public void saveUser(User user) {
//		repo.save(user);
//	}
	
	public List<User> listall(){
		return repo.findAll();
	}
	
	public User findById(int id) {
		return repo.findById(id).orElse(null);
	}
	
	public User findByEmail(String email)
	{
		return repo.findByEmail(email).orElse(null);
	}
//	public User validate(LoginDTO dto) {
//		User user= repo.findByEmail(dto.getEmail()).orElseThrow();
//		if(user!=null && user.getPassword().equals(dto.getPassword())) {
//			return user;
//		}
//		return null;
//	}
	
	public ApiResponse registerNewUser(UserDTO dto) {
		if(repo.existsByEmail(dto.getEmail()))
				throw new ApiException("User email already exists!!!");
		User user = modelMapper.map(dto,User.class);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
	//	user.setPassword(passwordEncoder.encode(dto.getPassword()));

		User savedUser = repo.save(user);
		
		return new ApiResponse("User registered with id "+ savedUser.getUserid());
	}
}
