package com.bookmymovie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookmymovie.models.SeatType;

@Repository
public interface SeatTypeRepository extends JpaRepository<SeatType, Integer> {

}
