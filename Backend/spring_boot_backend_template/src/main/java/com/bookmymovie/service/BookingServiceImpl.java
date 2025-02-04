package com.bookmymovie.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.exception.SeatNotAvailableException;
import com.bookmymovie.model.Booking;
import com.bookmymovie.model.BookingStatus;
import com.bookmymovie.model.Payment;
import com.bookmymovie.model.Seat;
import com.bookmymovie.model.Showtime;
import com.bookmymovie.model.User;
import com.bookmymovie.repository.BookingRepository;
import com.bookmymovie.repository.BookingSeatRepository;
import com.bookmymovie.repository.SeatRepository;
import com.bookmymovie.repository.ShowtimeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepo;
    private final BookingSeatRepository bookSeatRepo;
    private final ShowtimeRepository showtimeRepo;
    private final SeatRepository seatRepo;
    private final PaymentService paymentService;
    private final UserService userService;

    public Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, String paymentMethod) {
        User user = userService.getUserById(userId);
        Showtime showtime = showtimeRepo.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found"));
        
        List<Seat> seats = seatRepo.findAllById(seatIds);
        validateSeatAvailability(seats, showtime);
        
        double totalAmount = calculateTotalPrice(seats, showtime);
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShowtime(showtime);
        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.PENDING);
        
        Payment payment = paymentService.processPayment(booking, paymentMethod);
        booking.setPayment(payment);
        booking.setStatus(BookingStatus.CONFIRMED);
        
        return bookingRepo.save(booking);
    }

    public void validateSeatAvailability(List<Seat> seats, Showtime showtime) {
        List<Seat> bookedSeats = bookSeatRepo.findBookedSeatsByShowtime(showtime);
        if (seats.stream().anyMatch(bookedSeats::contains)) {
            throw new SeatNotAvailableException("One or more seats are already booked");
        }
    }
 
}