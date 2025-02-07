package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.ScreenRequest;
import com.bookmymovie.dto.TheaterRequest;
import com.bookmymovie.dto.TheaterResponse;
import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Theater;

public interface TheaterService {
	public ApiResponse addTheater(TheaterRequest theater, Long cityId);

	public ApiResponse addScreenToTheater(Long theaterId, ScreenRequest newScreen);
	public List<Theater> getTheatersByCity(Long cityId);

}
