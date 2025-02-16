package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.models.City;
import com.bookmymovie.models.Theater;

public interface TheaterRepository extends JpaRepository<Theater, Long> {
    List<Theater> findByCity(City city);
    List<Theater> findByNameContainingIgnoreCase(String query);
}