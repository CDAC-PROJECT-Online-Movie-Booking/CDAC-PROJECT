package com.bookmymovie.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.model.SeatType;

public interface SeatTypeRepository extends JpaRepository<SeatType, Long> {
    Optional<SeatType> findByName(String name);
    
    Optional<SeatType> findById(int id);
}
