package com.bookmymovie.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String role;
}
