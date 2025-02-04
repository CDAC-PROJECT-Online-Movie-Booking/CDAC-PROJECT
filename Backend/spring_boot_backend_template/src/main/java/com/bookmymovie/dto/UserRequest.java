package com.bookmymovie.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
	public class UserRequest {
	    private String name;
	    private String email;
	    private String password;
	}


