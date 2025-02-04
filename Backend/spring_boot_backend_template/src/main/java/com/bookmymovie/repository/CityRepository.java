package com.bookmymovie.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.model.City;

public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByName(String name);
}