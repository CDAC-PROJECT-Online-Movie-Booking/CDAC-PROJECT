package com.bookmymovie.models;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ShowtimeSeatPriceId implements Serializable {
   
	private static final long serialVersionUID = 1L;
	private Long showtimeId;
    private Long seatTypeId;
}
