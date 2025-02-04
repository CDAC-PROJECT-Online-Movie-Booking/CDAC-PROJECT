package com.bookmymovie.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Seat;
import com.bookmymovie.model.Showtime;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByScreen(Screen screen);
    
    @Query("SELECT s FROM Seat s WHERE s.screen = :screen AND s.seatId NOT IN " +
           "(SELECT bs.seat.seatId FROM BookingSeat bs WHERE bs.booking.showtime = :showtime)")
    List<Seat> findAvailableSeatsByShowtime(@Param("screen") Screen screen, 
                                          @Param("showtime") Showtime showtime);
}

