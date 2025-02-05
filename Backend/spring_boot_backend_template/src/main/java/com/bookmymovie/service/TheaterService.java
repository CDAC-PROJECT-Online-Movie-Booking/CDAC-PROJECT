package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Theater;

public interface TheaterService {
	public Theater addTheater(Theater theater, Long cityId);
	public Screen addScreenToTheater(Long theaterId, Screen screen);
	public List<Theater> getTheatersByCity(Long cityId);
}
