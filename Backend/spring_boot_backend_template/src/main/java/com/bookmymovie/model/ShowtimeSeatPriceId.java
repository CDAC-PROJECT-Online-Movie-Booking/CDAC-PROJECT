package com.bookmymovie.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ShowtimeSeatPriceId implements Serializable
{
	private Long showtime;
	private Long seatType;
}