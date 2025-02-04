package com.bookmymovie.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bookmymovie.repository.BookingRepository;
import com.bookmymovie.repository.PaymentRepository;

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
        List<Object[]> results = bookingRepo.getRevenueByMovie();
        return results.stream()
            .collect(Collectors.toMap(
                arr -> (String) arr[0],
                arr -> (Double) arr[1]
            ));
    }
}
