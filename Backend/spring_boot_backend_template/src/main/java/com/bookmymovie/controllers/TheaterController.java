package com.bookmymovie.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.dto.ScreenRequest;
import com.bookmymovie.dto.TheaterRequest;
import com.bookmymovie.dto.TheaterResponse;
import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Theater;
import com.bookmymovie.service.TheaterServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/theaters")
@RequiredArgsConstructor
public class TheaterController {
    private final TheaterServiceImpl theaterService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTheater(@RequestBody TheaterRequest newTheater, @RequestParam Long cityId) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(theaterService.addTheater(newTheater, cityId));
    }

    @GetMapping("/by-city")
    public ResponseEntity<List<Theater>> getTheatersByCity(@RequestParam Long cityId) {
        return ResponseEntity.ok(theaterService.getTheatersByCity(cityId));
    }

    @PostMapping("/{theaterId}/screens")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addScreen(@PathVariable Long theaterId, @RequestBody ScreenRequest newScreen) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(theaterService.addScreenToTheater(theaterId, newScreen));
    }
}
