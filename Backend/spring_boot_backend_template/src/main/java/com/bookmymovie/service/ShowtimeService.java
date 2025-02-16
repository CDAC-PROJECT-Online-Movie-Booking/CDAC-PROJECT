package com.bookmymovie.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.ShowtimeRequest;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.models.Movie;
import com.bookmymovie.models.Screen;
import com.bookmymovie.models.SeatType;
import com.bookmymovie.models.Showtime;
import com.bookmymovie.models.ShowtimeSeatPrice;
import com.bookmymovie.repository.MovieRepository;
import com.bookmymovie.repository.ScreenRepository;
import com.bookmymovie.repository.SeatTypeRepository;
import com.bookmymovie.repository.ShowtimeRepository;
import com.bookmymovie.repository.ShowtimeSeatPriceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ShowtimeService {
	
	@Autowired
    private ShowtimeRepository showtimeRepo;
	@Autowired
    private ShowtimeSeatPriceRepository seatPriceRepo;
	@Autowired
    private MovieRepository movieRepo;
	@Autowired
    private ScreenRepository screenRepo;
	@Autowired
    private SeatTypeRepository seatTypeRepo;
	
	@Autowired
	private ModelMapper modelMapper;

    public ApiResponse createShowtime(Long movieId, Long screenId, ShowtimeRequest newShowtime) {
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
        Screen screen = screenRepo.findById(screenId)
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found"));
        
        Showtime showtime = modelMapper.map(newShowtime, Showtime.class);
        showtime.setMovie(movie);
        showtime.setScreen(screen);
        showtimeRepo.save(showtime);
        return new ApiResponse("New ShowTime Added for Movieid-"+movie.getMovieId()+" for Screenid-"+screen.getScreenId());
    }

    public ApiResponse setSeatPriceForShowtime(Long showtimeId, Long seatTypeId, Double price) {
        Showtime showtime = showtimeRepo.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found"));
        SeatType seatType = seatTypeRepo.findById(seatTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat type not found"));
        
        ShowtimeSeatPrice seatPrice = new ShowtimeSeatPrice();
        seatPrice.setShowtime(showtime);
        seatPrice.setSeatType(seatType);
        seatPrice.setPrice(price);
        seatPriceRepo.save(seatPrice);

        return new ApiResponse("Price set for showtime");

    }
}