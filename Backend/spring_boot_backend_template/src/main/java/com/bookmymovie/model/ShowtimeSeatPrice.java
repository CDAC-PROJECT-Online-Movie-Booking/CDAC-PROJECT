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
@IdClass(ShowtimeSeatPriceId.class)
@Getter
@Setter
@Table(name = "showtime_seat_prices")
public class ShowtimeSeatPrice{
	
	@Id
	@ManyToOne
	@JoinColumn(name="showtime_id")
	private ShowTime showtime;
	
    @Id
    @ManyToOne
    @JoinColumn(name = "type_id")
    private SeatType seatType;

    @NotNull
    private Double price;
	
	
}

