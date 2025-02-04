package com.bookmymovie.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"screen" , "movie" , "bookings","seatPrices"})
@Table(name = "showtimes")

public class Showtime {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showtimeId;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

    @NotNull
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "screen_id")
    private Screen screen;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL)
    private List<ShowtimeSeatPrice> seatPrices = new ArrayList<>();

}
