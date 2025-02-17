package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.models.City;
import com.bookmymovie.models.Movie;
import com.bookmymovie.models.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    @Query("SELECT s FROM Showtime s WHERE s.movie = :movie AND s.screen.theater.city = :city " +
           "AND s.date >= CURRENT_DATE")
    List<Showtime> findUpcomingShowtimesByMovieAndCity(@Param("movie") Movie movie,
                                                     @Param("city") City city);

    List<Showtime> findByMovie(Movie movie);
}
