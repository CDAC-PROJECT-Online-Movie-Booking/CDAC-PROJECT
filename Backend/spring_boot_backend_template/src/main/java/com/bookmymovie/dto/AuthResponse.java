package com.bookmymovie.dto;

import com.bookmymovie.models.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
	private User user;
	private String jwt;
}
