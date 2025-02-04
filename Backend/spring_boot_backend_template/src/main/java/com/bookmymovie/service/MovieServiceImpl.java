package com.bookmymovie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.bookmymovie.exception.ResourceNotFoundException;

//import org.springframework.beans.factory.annotation.Autowired;

import com.bookmymovie.model.Movie;
import com.bookmymovie.repository.MovieRepository;

public class MovieServiceImpl implements MovieService{

	@Autowired
	 private  MovieRepository movieRepo;
	 
	
	
	@Override
	public Movie addMovie(Movie movie) {
		return movieRepo.save(movie);
	}

	@Override
	public Movie updateMovie(Long movieId , Movie updatedMovie) {
		Movie movie = getMovieById(movieId);
        movie.setTitle(updatedMovie.getTitle());
        movie.setGenre(updatedMovie.getGenre());
        movie.setDuration(updatedMovie.getDuration());
        return movieRepo.save(movie);


		
	}

	@Override
	public void deleteMovie(Long movieId) {
		movieRepo.deleteById(movieId);
		
	}

	@Override
	public List<Movie> getAllMovies() {
		return movieRepo.findAll();
	}

	@Override
	public Movie getMovieById(Long movieId) {
		return movieRepo.findById(movieId).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

	}

	@Override
	public List<Movie> searchMovies(String query) {
		// TODO Auto-generated method stub
		return null;
	}

}
