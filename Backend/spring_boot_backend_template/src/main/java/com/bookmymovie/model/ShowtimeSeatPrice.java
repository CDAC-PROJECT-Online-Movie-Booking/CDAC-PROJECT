package com.bookmymovie.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ShowtimeSeatPriceId.class)
@Getter
@Setter
@ToString(exclude = {"showtime" , "seatType"})
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

