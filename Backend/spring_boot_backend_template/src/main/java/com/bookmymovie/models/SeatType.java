package com.bookmymovie.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data

@Table(name="seat_type")
public class SeatType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seatTypeId;
	private String seatTypeDesc;
	private int fare;
	
}
