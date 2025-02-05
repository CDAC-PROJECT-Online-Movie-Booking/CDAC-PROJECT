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
	@EmbeddedId
    private BookingSeatId id;
	
    @MapsId("bookingId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @MapsId("seatId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @NotNull
    private Double priceSnapshot;
}
