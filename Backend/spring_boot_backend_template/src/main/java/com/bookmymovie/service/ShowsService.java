package com.bookmymovie.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.ShowDTO;
import com.bookmymovie.models.Shows;
import com.bookmymovie.repository.ShowsRepository;

@Service
public class ShowsService implements ShowServiceIntf{

	@Autowired private ShowsRepository repo; 
	@Autowired private MovieService mservice;
	@Autowired private ScreenService hservice;
	
	public void save(ShowDTO dto) {
		Shows show=new Shows();
		BeanUtils.copyProperties(dto, show);
		show.setScreen(hservice.findById(dto.getScreenId()));
		show.setMovie(mservice.findById(dto.getMovieId()));
		repo.save(show);
	}
	
	public List<Shows> listall(){
		return repo.findAll();
	}
	
	public List<Shows> todayShows(){
		return repo.todaysShow();
	}
	
	
	public Shows findById(int id) {
		return repo.findById(id).orElse(null);
	}
	
	public void deleteShow(int id) {
		repo.delete(repo.findById(id).orElse(null));
	}
}
