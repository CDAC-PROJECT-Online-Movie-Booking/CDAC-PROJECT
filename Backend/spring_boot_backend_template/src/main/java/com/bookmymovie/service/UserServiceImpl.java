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

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
	private ModelMapper modelMapper;
    
    
    
    public ApiResponse registerUser(UserRequest newUser)
    {
    	User user = modelMapper.map(newUser, User.class);
    	
    	userRepository.save(user);
    	return new ApiResponse("user registered successfully");
    }
    @Override
    public List<UserResponse> getAllUsers() {
   
    	return userRepository.findAll()
				.stream().map(user->modelMapper.map(user,UserResponse.class))
				.collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
    return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public ApiResponse updateUser(Long userId, UserRequest updatedUser) {

    
		String mesg="Id not exist";
		
			User user=userRepository.findById(userId)
					.orElseThrow(()->new ResourceNotFoundException("Invalid id"));
		modelMapper.map(updatedUser, user);
		
		mesg="User details updated successfully";
		return new ApiResponse(mesg);
    }

    @Override
    public ApiResponse deleteUser(Long userId) {
    	String msg = "Invalid user Id";
    	if (userRepository.existsById(userId)) {
    		userRepository.deleteById(userId);
    		msg="user deleted successfully";
    		return new ApiResponse(msg);
    	}
    	return new ApiResponse(msg);
    }
}
