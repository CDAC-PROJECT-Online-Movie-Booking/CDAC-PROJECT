package com.bookmymovie.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Theater> addTheater(@RequestBody Theater theater, @RequestParam Long cityId) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(theaterService.addTheater(theater, cityId));
    }

    @GetMapping("/by-city")
    public ResponseEntity<List<Theater>> getTheatersByCity(@RequestParam Long cityId) {
        return ResponseEntity.ok(theaterService.getTheatersByCity(cityId));
    }

    @PostMapping("/{theaterId}/screens")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Screen> addScreen(@PathVariable Long theaterId, @RequestBody Screen screen) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(theaterService.addScreenToTheater(theaterId, screen));
    }
}
