package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.BookingDTO;
import com.bookmymovie.dto.ShowCheckDTO;
import com.bookmymovie.models.Booking;

public interface BookingServiceItrf {

	public void save(BookingDTO dto);
	
	public List<Booking> listall();
	
	public List<Booking> alluserbooking(int id);
	
	public Booking findById(int id);
	
	public List<Booking> allOccupiedBookings(ShowCheckDTO dto);
	
	public void delete(int id);
	
}
