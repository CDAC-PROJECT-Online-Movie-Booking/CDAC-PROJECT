package com.bookmymovie.dto;

import com.bookmymovie.model.Role;

import lombok.*;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long userId;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
    
}