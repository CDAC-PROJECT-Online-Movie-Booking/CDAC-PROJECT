package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ScreenCapacityDTO;
import com.bookmymovie.models.Screen;

public interface ScreenServiceIntf {
	public void saveCapacity(ScreenCapacityDTO dto);
	public void deleteSeat(int id);
	public void save(Screen screen);
	public List<Screen> listall();
	public Screen findById(int id);
	public void deleteScreen(int id);
}
