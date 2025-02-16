package com.bookmymovie.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.ScreenRequest;
import com.bookmymovie.dto.TheaterRequest;
import com.bookmymovie.dto.TheaterResponse;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.models.City;
import com.bookmymovie.models.Screen;
import com.bookmymovie.models.Theater;
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
	@Autowired
	private ModelMapper modelMapper; 

    public ApiResponse addTheater(TheaterRequest newTheater, Long cityId) {
        City city = cityRepo.findById(cityId)
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        Theater theater = modelMapper.map(newTheater,Theater.class);
        theater.setCity(city);
        theaterRepo.save(theater);
        
        return new ApiResponse("Theater Added SuccessFully!!!");
    }

    public ApiResponse addScreenToTheater(Long theaterId, ScreenRequest newScreen) {
        Theater theater = theaterRepo.findById(theaterId)
                .orElseThrow(() -> new ResourceNotFoundException("Theater not found"));
        Screen screen = modelMapper.map(newScreen, Screen.class);
        screen.setTheater(theater);
        screenRepo.save(screen);
        return new ApiResponse("New Screen Added To Theater with ScreenId - "+screen.getScreenId());
    }

    public List<TheaterResponse> getTheatersByCity(Long cityId) {
        City city = cityRepo.findById(cityId).orElseThrow(() -> new ResourceNotFoundException("City not found"));
        List<Theater> theater = theaterRepo.findByCity(city);
        return theater.stream().map(t -> modelMapper.map(t, TheaterResponse.class)).collect(Collectors.toList());
        
    }
}