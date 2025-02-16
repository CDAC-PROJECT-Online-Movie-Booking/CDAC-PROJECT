package com.bookmymovie.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.models.SeatType;

public interface SeatTypeRepository extends JpaRepository<SeatType, Long> {
    Optional<SeatType> findByName(String name);
}
