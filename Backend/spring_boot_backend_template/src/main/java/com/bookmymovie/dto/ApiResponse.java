package com.bookmymovie.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse {
	 private LocalDateTime timeStamp;
	 private String message;
	 public ApiResponse(String message) {
		super();
		this.timeStamp = LocalDateTime.now();
		this.message = message;
	}
	 
}
