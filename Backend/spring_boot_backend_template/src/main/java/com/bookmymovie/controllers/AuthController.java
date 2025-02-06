package com.bookmymovie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.LoginRequest;
import com.bookmymovie.dto.UserRequest;
import com.bookmymovie.model.User;
import com.bookmymovie.service.AuthService;
import com.bookmymovie.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody UserRequest user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
    }
}

