package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ShowDTO;
import com.bookmymovie.models.Shows;

public interface ShowServiceIntf {
	public void save(ShowDTO dto);
	public List<Shows> listall();
	public List<Shows> todayShows();
	public Shows findById(int id);
	public void deleteShow(int id);
}
