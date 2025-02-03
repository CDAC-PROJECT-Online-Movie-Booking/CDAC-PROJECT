package com.bookmymovie.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "booking_seats")
@ToString(exclude = {"booking" ,"seat"})
public class BookingSeat {
    @Id
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @NotNull
    private Double priceSnapshot;
}
