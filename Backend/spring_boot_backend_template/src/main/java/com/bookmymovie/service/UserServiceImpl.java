package com.bookmymovie.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.OtpVerificationRequest;
import com.bookmymovie.dto.UserRequest;
import com.bookmymovie.dto.UserResponse;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.models.Role;
import com.bookmymovie.models.User;
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
    PasswordEncoder passwordEncoder;

    @Autowired
	private ModelMapper modelMapper;
    
    @Autowired
    private final EmailService emailService; 
    
    public UserResponse convertToUserResponse(User user) {
        return modelMapper.map(user, UserResponse.class);
    }
    
    @Override
    public ApiResponse registerUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse("Email already exists.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setOtp(generateOtp());
        user.setVerified(false);

        userRepository.save(user);
        emailService.sendOtpEmail(user.getEmail(), user.getOtp(), user.getName());

        return new ApiResponse("OTP sent to your email. Please verify.");
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

    
		String mesg="Id does not exist";
		
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
    		msg="User deleted successfully";
    		return new ApiResponse(msg);
    	}
    	return new ApiResponse(msg);
    }

	@Override
	public ApiResponse verifyOtp(OtpVerificationRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return new ApiResponse("User not found.");
        }

        User user = optionalUser.get();
        if (user.isVerified()) {
            return new ApiResponse("User already verified.");
        }

        if (user.getOtp().equals(request.getOtp())) {
            user.setVerified(true);
            user.setOtp(null); // Clear OTP after verification
            userRepository.save(user);
            return new ApiResponse("success");
        } else {
            return new ApiResponse("error");
        }
    }

    public String generateOtp() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));
    }

	
}
