package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.model.Booking;
import com.bookmymovie.model.BookingStatus;
import com.bookmymovie.model.Showtime;
import com.bookmymovie.model.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByStatus(BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.showtime = :showtime AND b.status <> 'CANCELLED'")
    List<Booking> findActiveBookingsForShowtime(@Param("showtime") Showtime showtime);
}