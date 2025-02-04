package com.bookmymovie.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final PaymentRepository paymentRepo;
    private final BookingRepository bookingRepo;

    public Double getTotalRevenue() {
        return paymentRepo.getTotalRevenue();
    }

    public Map<String, Double> getRevenueByMovie() {
        // Custom query to group revenue by movie
        return bookingRepo.getRevenueByMovie();
    }
}
