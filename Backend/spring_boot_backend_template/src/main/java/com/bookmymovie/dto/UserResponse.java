package com.bookmymovie.dto;

import com.bookmymovie.model.Role;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResponse {
    private Long userId;
    private String name;
    private String email;
    private Role role;
}