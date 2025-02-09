package com.bookmymovie.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TokenResponse {

	private LocalDateTime timeStamp;
	 private String token;
	 public TokenResponse(String token) {
		super();
		this.timeStamp = LocalDateTime.now();
		this.token = token;
	}
}
