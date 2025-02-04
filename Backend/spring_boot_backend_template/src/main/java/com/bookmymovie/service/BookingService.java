package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.model.Booking;
import com.bookmymovie.model.Seat;
import com.bookmymovie.model.Showtime;
import com.bookmymovie.model.User;

public interface BookingService {

    Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, String paymentMethod) ;
    void validateSeatAvailability(List<Seat> seats, Showtime showtime);
    double calculateTotalPrice(List<Seat> seats, Showtime showtime);
    List<Booking> getBookingsByUser(User user);
    Booking cancelBooking(Long bookingId);
}