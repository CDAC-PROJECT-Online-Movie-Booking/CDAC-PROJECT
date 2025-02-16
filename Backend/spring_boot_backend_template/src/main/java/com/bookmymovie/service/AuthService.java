package com.bookmymovie.service;

import com.bookmymovie.exception.AuthenticationException;
import com.bookmymovie.models.User;
import com.bookmymovie.repository.UserRepository;
import com.bookmymovie.security.CustomUserDetails;
import com.bookmymovie.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String login(String email, String password) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException("Invalid credentials"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthenticationException("Invalid credentials");
        }
        
        UserDetails userDetails = new CustomUserDetails(user);
        return jwtService.generateToken(userDetails);
    }
}