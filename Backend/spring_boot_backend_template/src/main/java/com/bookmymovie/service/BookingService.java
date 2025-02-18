package com.bookmymovie.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.BookingDTO;
import com.bookmymovie.dto.ShowCheckDTO;
import com.bookmymovie.models.Booking;
import com.bookmymovie.repository.*;

@Service
public class BookingService {

	@Autowired private BookingRepository repo;
	@Autowired private ShowsService sservice;
	@Autowired private SeatTypeService stservice;
	@Autowired private UserService uservice;
	
	public void save(BookingDTO dto) {
		Booking bk=new Booking();
		bk.setShowDate(dto.getBookDate());
		bk.setNoOfSeats(dto.getNoOfSeats());
		bk.setSeatnos(IntStream.of(dto.getSeatnums())
                .mapToObj(Integer::toString)
                .collect(Collectors.joining(", ")));
		bk.setCost(dto.getCost());
		bk.setShow(sservice.findById(dto.getShowId()));
		bk.setUser(uservice.findById(dto.getUserId()));
		repo.save(bk);
	}
	
	public List<Booking> listall(){
		return repo.findAll();
	}
	
	public List<Booking> alluserbooking(int id){
		return repo.findByUser(uservice.findById(id));
	}
	
	public Booking findById(int id) {
		return repo.findById(id).orElse(null);
	}
	
	public List<Booking> allOccupiedBookings(ShowCheckDTO dto){
		return repo.findByShowShowIdAndShowDate(dto.getShowid(), dto.getDate());
	}
	
	public void delete(int id) {
		Booking bk=repo.findById(id).orElse(null);
		bk.setStatus("Cancelled");
		bk.setCancelCharges((float) (bk.getCost()*.20));
		bk.setCost(0);
		repo.save(bk);
	}
}