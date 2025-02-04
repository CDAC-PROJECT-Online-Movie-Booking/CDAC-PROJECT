package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.model.BookingSeat;
import com.bookmymovie.model.BookingSeatId;
import com.bookmymovie.model.Seat;
import com.bookmymovie.model.Showtime;

public interface BookingSeatRepository extends JpaRepository<BookingSeat, BookingSeatId> {
    @Query("SELECT bs.seat FROM BookingSeat bs WHERE bs.booking.showtime = :showtime")
    List<Seat> findBookedSeatsByShowtime(@Param("showtime") Showtime showtime);
}
