package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.models.Booking;
import com.bookmymovie.models.BookingStatus;
import com.bookmymovie.models.Showtime;
import com.bookmymovie.models.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByStatus(BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.showtime = :showtime AND b.status <> 'CANCELLED'")
    List<Booking> findActiveBookingsForShowtime(@Param("showtime") Showtime showtime);
    
    @Query("SELECT m.title, SUM(b.totalAmount) " +
            "FROM Booking b " +
            "JOIN b.showtime s " +
            "JOIN s.movie m " +
            "WHERE b.status = 'CONFIRMED' " +
            "GROUP BY m.title")
     List<Object[]> getRevenueByMovie();
}