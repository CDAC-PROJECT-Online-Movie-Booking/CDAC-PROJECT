package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.TheaterRequest;
import com.bookmymovie.dto.TheaterResponse;
import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Theater;

public interface TheaterService {
	public ApiResponse addTheater(TheaterRequest theater, Long cityId);
	public Screen addScreenToTheater(Long theaterId, Screen screen);
	public List<TheaterResponse> getTheatersByCity(Long cityId);
}
