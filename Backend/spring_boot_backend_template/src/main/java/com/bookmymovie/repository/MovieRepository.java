package com.bookmymovie.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.models.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
	List<Movie> findByTitleContainingIgnoreCase(String query);
    List<Movie> findByGenre(String genre);
    List<Movie> findByReleaseDateAfter(LocalDate date);


}
