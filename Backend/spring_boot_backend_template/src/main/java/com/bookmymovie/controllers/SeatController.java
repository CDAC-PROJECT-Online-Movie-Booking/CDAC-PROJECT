package com.bookmymovie.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookmymovie.dto.SeatResponse;
import com.bookmymovie.model.Seat;
import com.bookmymovie.service.SeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {
    private final SeatService seatService;

    @GetMapping("/available")
    public ResponseEntity<List<SeatResponse>> getAvailableSeats(@RequestParam Long showtimeId) {
        return ResponseEntity.ok(seatService.getAvailableSeatsForShowtime(showtimeId));
    }
}
