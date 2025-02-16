package com.bookmymovie.dto;

import lombok.*;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

import com.bookmymovie.models.Role;

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