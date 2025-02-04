package com.bookmymovie.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.model.SeatType;
import com.bookmymovie.model.Showtime;
import com.bookmymovie.model.ShowtimeSeatPrice;
import com.bookmymovie.model.ShowtimeSeatPriceId;

public interface ShowtimeSeatPriceRepository extends JpaRepository<ShowtimeSeatPrice, ShowtimeSeatPriceId> {
    List<ShowtimeSeatPrice> findByShowtime(Showtime showtime);
    
    @Query("SELECT ssp FROM ShowtimeSeatPrice ssp " +
           "WHERE ssp.showtime = :showtime AND ssp.seatType = :seatType")
    Optional<ShowtimeSeatPrice> findByShowtimeAndSeatType(@Param("showtime") Showtime showtime,
                                                        @Param("seatType") SeatType seatType);
    
}