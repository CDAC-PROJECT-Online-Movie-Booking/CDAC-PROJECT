package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.SeatResponse;

public interface SeatService {

	public List<SeatResponse> getAvailableSeatsForShowtime(Long showtimeId);
}
