package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.models.Booking;
import com.bookmymovie.models.Seat;
import com.bookmymovie.models.Showtime;
import com.bookmymovie.models.User;

public interface BookingService {

    Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, String paymentMethod) ;
    void validateSeatAvailability(List<Seat> seats, Showtime showtime);
    double calculateTotalPrice(List<Seat> seats, Showtime showtime);
    List<Booking> getBookingsByUser(User user);
    Booking cancelBooking(Long bookingId);
}