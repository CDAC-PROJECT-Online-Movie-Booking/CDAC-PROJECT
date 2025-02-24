package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.models.SeatType;

public interface SeatTypeServiceIntf {
	public void save(SeatType st);
	
	public List<SeatType> listall();
	
	public SeatType findById(int id);
	
	public void deleteSeatType(int id);
}
