package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.MovieRequest;
import com.bookmymovie.dto.MovieResponse;
import com.bookmymovie.model.Movie;

public interface MovieService {
	
	
	public ApiResponse addMovie(MovieRequest movie);
	public ApiResponse updateMovie(Long movieId , MovieRequest updatedMovie);
	public ApiResponse deleteMovie(Long movieId);
	public List<MovieResponse> getAllMovies();
	public MovieResponse getMovieById(Long movieId);
	public List<MovieResponse> searchMovies(String query);
	
	
}
