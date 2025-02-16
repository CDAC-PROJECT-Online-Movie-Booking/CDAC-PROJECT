package com.bookmymovie.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.models.Screen;
import com.bookmymovie.models.Seat;
import com.bookmymovie.models.Showtime;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByScreen(Screen screen);
    
   
    
    @Query("SELECT s FROM Seat s LEFT JOIN BookingSeat bs ON s.seatId = bs.seat.seatId AND bs.booking.showtime = :showtime " +
    	       "WHERE s.screen = :screen AND bs.seat IS NULL")
    	List<Seat> findAvailableSeatsByShowtime(@Param("screen") Screen screen, @Param("showtime") Showtime showtime);

}

