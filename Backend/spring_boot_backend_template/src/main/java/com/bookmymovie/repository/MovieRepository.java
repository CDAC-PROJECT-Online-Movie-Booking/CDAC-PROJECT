package com.bookmymovie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookmymovie.models.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer>{

}
