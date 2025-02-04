package com.bookmymovie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {

}
