package com.bookmymovie.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.SeatResponse;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.model.Seat;
import com.bookmymovie.model.Showtime;
import com.bookmymovie.repository.SeatRepository;
import com.bookmymovie.repository.ShowtimeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService{
	
	@Autowired
	private ModelMapper modelMapper;
    private final SeatRepository seatRepo;
    private final ShowtimeRepository showtimeRepo;

    public List<SeatResponse> getAvailableSeatsForShowtime(Long showtimeId)
    {
        Showtime showtime = showtimeRepo.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found"));
        List <Seat> seatList= seatRepo.findAvailableSeatsByShowtime(showtime.getScreen(), showtime);
        
        return seatList.stream().map(seat -> modelMapper.map(seatList, SeatResponse.class)).collect(Collectors.toList());
    }
    
    
}
