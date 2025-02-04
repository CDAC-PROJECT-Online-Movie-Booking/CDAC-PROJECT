package com.bookmymovie.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingRequest {
    private Long showtimeId;
    private List<Long> seatIds;
    private String paymentMethod;
}
