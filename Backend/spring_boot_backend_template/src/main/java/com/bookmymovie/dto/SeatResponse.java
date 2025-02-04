package com.bookmymovie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatResponse {

	private String seatRow;
    private Integer seatNumber;
    private String seatType;
    private Double price;

}
