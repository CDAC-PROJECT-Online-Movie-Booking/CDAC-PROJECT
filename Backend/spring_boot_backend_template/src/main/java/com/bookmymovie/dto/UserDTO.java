package com.bookmymovie.dto;

import com.bookmymovie.models.UserRole;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserDTO {
	private String userName;
	private boolean isAdmin;
	private String mobile;
	private String email;
	private String password;
	private UserRole role;
}
