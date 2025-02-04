package com.bookmymovie.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.bookmymovie.model.Movie;
import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Showtime;
import com.bookmymovie.model.ShowtimeSeatPrice;
import com.bookmymovie.repository.ShowtimeRepository;
import com.bookmymovie.repository.ShowtimeSeatPriceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShowtimeService {
    private final ShowtimeRepository showtimeRepo;
    private final ShowtimeSeatPriceRepository seatPriceRepo;
    private final MovieRepository movieRepo;
    private final ScreenRepository screenRepo;

    public Showtime createShowtime(Long movieId, Long screenId, LocalTime startTime, LocalTime endTime, LocalDate date) {
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
        Screen screen = screenRepo.findById(screenId)
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found"));
        
        Showtime showtime = new Showtime();
        showtime.setMovie(movie);
        showtime.setScreen(screen);
        showtime.setStartTime(startTime);
        showtime.setEndTime(endTime);
        showtime.setDate(date);
        return showtimeRepo.save(showtime);
    }

    public void setSeatPriceForShowtime(Long showtimeId, Long seatTypeId, Double price) {
        Showtime showtime = showtimeRepo.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found"));
        SeatType seatType = seatTypeRepo.findById(seatTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat type not found"));
        
        ShowtimeSeatPrice seatPrice = new ShowtimeSeatPrice();
        seatPrice.setShowtime(showtime);
        seatPrice.setSeatType(seatType);
        seatPrice.setPrice(price);
        seatPriceRepo.save(seatPrice);
    }
}