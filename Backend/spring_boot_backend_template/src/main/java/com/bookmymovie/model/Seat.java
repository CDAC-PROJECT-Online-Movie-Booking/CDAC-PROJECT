package com.bookmymovie.model;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"screen" , "seatType","bookingSeats"})
@Table(name = "seats", 
    uniqueConstraints = @UniqueConstraint(columnNames = {"screen_id", "seat_row", "seat_number"}))
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    @NotBlank
    private String seatRow;

    @NotNull
    private Integer seatNumber;

    @ManyToOne
    @JoinColumn(name = "screen_id")
    private Screen screen;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private SeatType seatType;

    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL)
    private List<BookingSeat> bookingSeats = new ArrayList<>();
}
