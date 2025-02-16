package com.bookmymovie.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "showtime_seat_prices")
@ToString(exclude = {"showtime", "seatType"})
public class ShowtimeSeatPrice {
    @EmbeddedId
    private ShowtimeSeatPriceId id;

    @ManyToOne
    @MapsId("showtimeId") // Maps to showtimeId in ShowtimeSeatPriceId
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @ManyToOne
    @MapsId("seatTypeId") // Maps to seatTypeId in ShowtimeSeatPriceId
    @JoinColumn(name = "seat_type_id")
    private SeatType seatType;

    @NotNull
    private Double price; // Ensure there are no hidden characters here


}