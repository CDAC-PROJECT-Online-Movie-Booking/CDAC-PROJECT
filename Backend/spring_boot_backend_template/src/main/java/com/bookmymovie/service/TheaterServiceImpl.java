package com.bookmymovie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.model.City;
import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Theater;
import com.bookmymovie.repository.CityRepository;
import com.bookmymovie.repository.ScreenRepository;
import com.bookmymovie.repository.TheaterRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TheaterServiceImpl implements TheaterService {
	@Autowired
    private TheaterRepository theaterRepo;
	@Autowired
    private CityRepository cityRepo;
	@Autowired
    private ScreenRepository screenRepo;

    public Theater addTheater(Theater theater, Long cityId) {
        City city = cityRepo.findById(cityId)
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        theater.setCity(city);
        return theaterRepo.save(theater);
    }

    public Screen addScreenToTheater(Long theaterId, Screen screen) {
        Theater theater = theaterRepo.findById(theaterId)
                .orElseThrow(() -> new ResourceNotFoundException("Theater not found"));
        screen.setTheater(theater);
        return screenRepo.save(screen);
    }

    public List<Theater> getTheatersByCity(Long cityId) {
        City city = cityRepo.findById(cityId).orElseThrow(() -> new ResourceNotFoundException("City not found"));
        return theaterRepo.findByCity(city);
        
    }
}