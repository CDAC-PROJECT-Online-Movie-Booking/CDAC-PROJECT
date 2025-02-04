package com.bookmymovie.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.UserRequest;
import com.bookmymovie.dto.UserResponse;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.model.User;
import com.bookmymovie.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
	private ModelMapper modelMapper;
    
    @Override
    public List<UserResponse> getAllUsers() {
   
    	return userRepository.findAll()
				.stream().map(user->modelMapper.map(user,UserResponse.class))
				.collect(Collectors.toList());
    }

    @Override
    public User getUserById(Long userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return user;
    }

    @Override
    public ApiResponse updateUser(Long userId, UserRequest updatedUser) {

    
		String mesg="Id not exist";
		
			User user=userRepository.findById(userId)
					.orElseThrow(()->new ResourceNotFoundException("Invalid id"));
		modelMapper.map(updatedUser, user);
		
		mesg="category updated";
		return new ApiResponse(mesg);
    }

    @Override
    public ApiResponse deleteUser(Long userId) {
   
    	String msg = "Invalid product Id";

		if (userRepository.existsById(userId)) {
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new ResourceNotFoundException("Invalid Product ID!!!"));
		//	user.setStatus(false);
			msg = "Product deleted successfully";
			
		}
		return new ApiResponse(msg);
    }
}
