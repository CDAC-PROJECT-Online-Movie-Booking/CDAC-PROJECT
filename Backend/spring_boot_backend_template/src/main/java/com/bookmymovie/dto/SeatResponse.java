package com.bookmymovie.dto;


import lombok.Data;

@Data
public class SeatResponse {

	private String seatRow;
    private Integer seatNumber;
    private String seatType;
    private Double price;

}
