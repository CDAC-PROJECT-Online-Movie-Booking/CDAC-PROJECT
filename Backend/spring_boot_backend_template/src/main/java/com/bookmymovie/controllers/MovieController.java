package com.bookmymovie.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookmymovie.dto.MovieResponse;
import com.bookmymovie.model.Movie;
import com.bookmymovie.service.MovieService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
	
	 private final MovieService movieService;

	    @GetMapping
	    public ResponseEntity<List<MovieResponse>> getAllMovies() {
	        return ResponseEntity.ok(movieService.getAllMovies());
	    }

	    @GetMapping("/{movieId}")
	    public ResponseEntity<MovieResponse> getMovie(@PathVariable Long movieId) {
	        return ResponseEntity.ok(movieService.getMovieById(movieId));
	    }

	    @PostMapping
//	    @PreAuthorize("hasRole('ADMIN')")
	    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
	        return ResponseEntity.status(HttpStatus.CREATED).body(movieService.addMovie(movie));
	    }

	    @GetMapping("/search")
	    public ResponseEntity<List<MovieResponse>> searchMovies(@RequestParam String query) {
	        return ResponseEntity.ok(movieService.searchMovies(query));
	        		
	    }

}
