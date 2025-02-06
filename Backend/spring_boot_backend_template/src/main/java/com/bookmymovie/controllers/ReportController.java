package com.bookmymovie.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/revenue")
    public ResponseEntity<Double> getTotalRevenue() {
        return ResponseEntity.ok(reportService.getTotalRevenue());
    }

    @GetMapping("/revenue-by-movie")
    public ResponseEntity<Map<String, Double>> getRevenueByMovie() {
        return ResponseEntity.ok(reportService.getRevenueByMovie());
    }
}
