package com.bookmymovie.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @NotNull
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingSeat> seats = new ArrayList()<>();

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;

    public enum BookingStatus { CONFIRMED, CANCELLED, PENDING }
}
