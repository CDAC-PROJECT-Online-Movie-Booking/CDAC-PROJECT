package com.bookmymovie.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.bookmymovie.models.Movie;

public interface MovieServiceIntf {

	public void save(Movie movie,MultipartFile photo);
	
	public List<Movie> listall();
	
	public Movie findById(int id);
	
	public void deleteMovie(int id);
}
