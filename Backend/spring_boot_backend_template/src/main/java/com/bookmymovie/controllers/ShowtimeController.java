package com.bookmymovie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.dto.ShowtimeRequest;
import com.bookmymovie.models.Showtime;
import com.bookmymovie.models.ShowtimeSeatPrice;
import com.bookmymovie.service.ShowtimeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/showtimes")
@RequiredArgsConstructor
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createShowtime(
        @RequestParam Long movieId,
        @RequestParam Long screenId,
        @RequestBody ShowtimeRequest newShowtime
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(showtimeService.createShowtime(
                movieId, 
                screenId, 
                newShowtime
            ));
    }


    @PostMapping("/{showtimeId}/seat-prices")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> setSeatPrice(
        @PathVariable Long showtimeId,
        @RequestParam Long seatTypeId,
        @RequestParam Double price
    ) {
        return ResponseEntity.ok(showtimeService.setSeatPriceForShowtime(showtimeId, seatTypeId, price));
    }
}