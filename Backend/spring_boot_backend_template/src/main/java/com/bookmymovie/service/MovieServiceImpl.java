package com.bookmymovie.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.bookmymovie.dto.ApiResponse;
import com.bookmymovie.dto.MovieRequest;
import com.bookmymovie.dto.MovieResponse;
import com.bookmymovie.exception.ResourceNotFoundException;

//import org.springframework.beans.factory.annotation.Autowired;

import com.bookmymovie.model.Movie;
import com.bookmymovie.repository.MovieRepository;

public class MovieServiceImpl implements MovieService{

	@Autowired
	 private  MovieRepository movieRepo;
	 
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ApiResponse addMovie(Movie movie) {
		movieRepo.save(movie);
		return new ApiResponse("Movie Added successfully");
	}

	@Override
	public ApiResponse updateMovie(Long movieId , MovieRequest updatedMovie) {
		String mesg = "Movie Updation Failed - invalid movie ID";
		Movie movie = movieRepo.findById(movieId).orElseThrow(() -> new ResourceNotFoundException("Invalid Movie Id ! ! !"));
        
		modelMapper.map(updatedMovie, movie);
        movieRepo.save(movie);
        mesg="Movie updated !";
        return new ApiResponse(mesg);


		
	}

	@Override
	public ApiResponse deleteMovie(Long movieId) {
		movieRepo.deleteById(movieId);
		return new ApiResponse("Movie deleted with id " + movieId);
		
	}

	@Override
	public List<MovieResponse> getAllMovies() {
		return movieRepo.findAll().stream().map(movie -> modelMapper.map(movie, MovieResponse.class) ).collect(Collectors.toList());
	}

	@Override
	public MovieResponse getMovieById(Long movieId) {
		 Movie movieEntity=movieRepo.findById(movieId).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
		 return modelMapper.map(movieEntity, MovieResponse.class);
	}

	@Override
	public List<MovieResponse> searchMovies(String query) {
		List<Movie> movieList= movieRepo.findByTitleContainingIgnoreCase(query);
		
		return movieList.stream().map(movie -> modelMapper.map(movie, MovieResponse.class)).collect(Collectors.toList());
	}

}
