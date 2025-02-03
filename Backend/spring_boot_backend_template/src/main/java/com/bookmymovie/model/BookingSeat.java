package com.bookmymovie.model;

import java.time.LocalDateTime;
import java.util.List;

import com.bookmymovie.model.User.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "booking_seats")
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
