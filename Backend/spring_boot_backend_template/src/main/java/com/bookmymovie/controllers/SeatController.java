package com.bookmymovie.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookmymovie.dto.SeatResponse;
import com.bookmymovie.models.Seat;
import com.bookmymovie.service.SeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {
    private final SeatService seatService;

    @GetMapping("/available")
    public ResponseEntity<List<SeatResponse>> getAvailableSeats(@RequestParam(required = true) Long showtimeId) {
        if (showtimeId == null || showtimeId <= 0) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(seatService.getAvailableSeatsForShowtime(showtimeId));
    }
}
