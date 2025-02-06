package com.bookmymovie.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bookmymovie.model.BookingStatus;

import lombok.Data;

@Data
public class BookingResponse {
	private String userName;
	private LocalDateTime showtime;
    private Long bookingId;
    private Double totalAmount;
    private BookingStatus status;
    private LocalDateTime createdAt;
    private List<SeatResponse> seats;
}
