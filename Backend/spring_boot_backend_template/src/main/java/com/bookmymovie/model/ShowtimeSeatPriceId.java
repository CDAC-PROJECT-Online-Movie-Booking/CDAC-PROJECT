package com.bookmymovie.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShowtimeSeatPriceId implements Serializable
{
	private static final long serialVersionUID = 1L;
	private Long showtime;
	private Long seatType;
}