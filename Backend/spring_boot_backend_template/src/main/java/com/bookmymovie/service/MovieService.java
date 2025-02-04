package com.bookmymovie.service;

import java.util.List;

import com.bookmymovie.model.Movie;

public interface MovieService {
	
	
	public Movie addMovie(Movie movie);
	public Movie updateMovie(Long movieId , Movie updatedMovie);
	public void deleteMovie(Long movieId);
	public List<Movie> getAllMovies();
	public Movie getMovieById(Long movieId);
	public List<Movie> searchMovies(String query);
	
	
}
