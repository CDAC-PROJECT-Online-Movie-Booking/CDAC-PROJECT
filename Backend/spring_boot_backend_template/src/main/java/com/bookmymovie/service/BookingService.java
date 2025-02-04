package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.model.Booking;
import com.bookmymovie.model.Seat;
import com.bookmymovie.model.Showtime;

public interface BookingService {

    Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, String paymentMethod) ;
    void validateSeatAvailability(List<Seat> seats, Showtime showtime);
}