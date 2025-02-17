package com.bookmymovie.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.models.SeatType;
import com.bookmymovie.repos.SeatTypeRepository;

@Service
public class SeatTypeService {
	@Autowired private SeatTypeRepository repo;

	public void save(SeatType st) {
		repo.save(st);
	}

	public List<SeatType> listall(){
		return repo.findAll();
	}

	public SeatType findById(int id) {
		return repo.findById(id).orElse(null);
	}

	public void deleteSeatType(int id) {
		repo.delete(repo.findById(id).orElse(null));
	}
}
