package com.bookmymovie.service;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.dto.UserResponse;
import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.exception.SeatNotAvailableException;
import com.bookmymovie.models.Booking;
import com.bookmymovie.models.BookingStatus;
import com.bookmymovie.models.Payment;
import com.bookmymovie.models.Seat;
import com.bookmymovie.models.SeatType;
import com.bookmymovie.models.Showtime;
import com.bookmymovie.models.User;
import com.bookmymovie.repository.BookingRepository;
import com.bookmymovie.repository.BookingSeatRepository;
import com.bookmymovie.repository.SeatRepository;
import com.bookmymovie.repository.ShowtimeRepository;
import com.bookmymovie.repository.ShowtimeSeatPriceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {
	
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
    private BookingRepository bookingRepo;
	@Autowired
    private BookingSeatRepository bookSeatRepo;
	@Autowired
    private  ShowtimeRepository showtimeRepo;
	@Autowired
    private  SeatRepository seatRepo;
	@Autowired
    private  PaymentService paymentService;
	@Autowired
    private  UserService userService;
	@Autowired
    private  ShowtimeSeatPriceRepository showtimeSeatPriceRepository; 

    public Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, String paymentMethod) {
        UserResponse user = userService.getUserById(userId);
        Showtime showtime = showtimeRepo.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found"));
        
        List<Seat> seats = seatRepo.findAllById(seatIds);
        validateSeatAvailability(seats, showtime);
        
        double totalAmount = calculateTotalPrice(seats, showtime);
        Booking booking = new Booking();
        
        /*if this service does not work then use modelMapper in controller to resolve*/
        booking.setUser(modelMapper.map(user, User.class));
        booking.setShowtime(showtime);
        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.PENDING);
        
        Payment payment = paymentService.processPayment(booking, paymentMethod);
        booking.setPayment(payment);
        booking.setStatus(BookingStatus.CONFIRMED);
        
        return bookingRepo.save(booking);
    }
    
    public double calculateTotalPrice(List<Seat> seats, Showtime showtime) {
        return seats.stream()
            .mapToDouble(seat -> {
                SeatType seatType = seat.getSeatType();
                return showtimeSeatPriceRepository.findByShowtimeAndSeatType(showtime, seatType)
                    .orElseThrow(() -> new RuntimeException("Price not found for seat type"))
                    .getPrice();
            })
            .sum();
    }

	
	@Override
	public void validateSeatAvailability(List<Seat> seats, Showtime showtime) {
	    List<Seat> bookedSeats = bookSeatRepo.findBookedSeatsByShowtime(showtime);
	    if (seats.stream().anyMatch(bookedSeats::contains)) {
	        throw new SeatNotAvailableException("One or more seats are already booked");
	    }
	}

	@Override
	public List<Booking> getBookingsByUser(User user) {
		return bookingRepo.findByUser(user);
	}
 
	@Transactional
	public Booking cancelBooking(Long bookingId) {
	    Booking booking = bookingRepo.findById(bookingId)
	        .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
	    
	    // Get showtime datetime
	    LocalDateTime showtimeDateTime = booking.getShowtime().getDateTime();
	    
	    // Validate cancellation window (e.g., 24 hours before showtime)
	    if (showtimeDateTime.isBefore(LocalDateTime.now().plusHours(24))) {
	        throw new IllegalStateException("Cancellation not allowed within 24 hours of showtime");
	    }
	    
	    booking.setStatus(BookingStatus.CANCELLED);
	    
	    // Process refund
	    if (booking.getPayment() != null) {
	        paymentService.processRefund(booking.getPayment().getPaymentId());
	    }
	    
	    return bookingRepo.save(booking);
	}
}