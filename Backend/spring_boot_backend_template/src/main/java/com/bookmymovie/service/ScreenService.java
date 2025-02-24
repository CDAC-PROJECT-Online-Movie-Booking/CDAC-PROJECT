package com.bookmymovie.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.ScreenCapacityDTO;
import com.bookmymovie.models.Screen;
import com.bookmymovie.models.ScreenCapacity;
import com.bookmymovie.repository.ScreenCapacityRepository;
import com.bookmymovie.repository.ScreenRepository;

@Service
public class ScreenService implements ScreenServiceIntf {
	@Autowired private ScreenRepository repo;
	@Autowired private ScreenCapacityRepository screpo;
	@Autowired private SeatTypeService sservice;
	
	public void saveCapacity(ScreenCapacityDTO dto) {
		ScreenCapacity hc=new ScreenCapacity();
		BeanUtils.copyProperties(dto, hc);
		hc.setSeatType(sservice.findById(dto.getSeatTypeId()));
		Screen screen=repo.findById(dto.getScreenId()).orElse(null);
		hc.setScreen(screen);
		
		ScreenCapacity hcc= screpo.save(hc);
		List<ScreenCapacity> hcs= screen.getScreenCapacity();
		hcs.add(hcc);
		screen.setScreenCapacity(hcs);
		repo.save(screen);
	}
	
	public void deleteSeat(int id) {
		ScreenCapacity sc=screpo.findById(id).orElse(null);
		Screen screen=sc.getScreen();
		List<ScreenCapacity> hcs= screen.getScreenCapacity();
		hcs.remove(sc);
		repo.save(screen);
		screpo.delete(sc);
	}

	public void save(Screen screen) {
		repo.save(screen);
	}

	public List<Screen> listall(){
		return repo.findAll();
	}

	public Screen findById(int id) {
		return repo.getById(id);
	}

	public void deleteScreen(int id) {
		repo.delete(repo.getById(id));
	}
}
