package com.bookmymovie.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.SeatResponse;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.models.Seat;
import com.bookmymovie.models.Showtime;
import com.bookmymovie.repository.SeatRepository;
import com.bookmymovie.repository.ShowtimeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SeatServiceImpl implements SeatService{
	
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
    private SeatRepository seatRepo;
	@Autowired
    private ShowtimeRepository showtimeRepo;

    public List<SeatResponse> getAvailableSeatsForShowtime(Long showtimeId)
    {
        Showtime showtime = showtimeRepo.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found"));
        List <Seat> seatList= seatRepo.findAvailableSeatsByShowtime(showtime.getScreen(), showtime);
        
        return seatList.stream().map(seat -> modelMapper.map(seat, SeatResponse.class)).collect(Collectors.toList());
    }
    
    
  
    
}
