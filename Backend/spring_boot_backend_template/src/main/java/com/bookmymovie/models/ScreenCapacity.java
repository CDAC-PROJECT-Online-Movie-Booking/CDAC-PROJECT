package com.bookmymovie.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="screen_capacity")
@Data
public class ScreenCapacity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "Screen_id")
	@JsonBackReference
	private Screen screen;
	@ManyToOne
	@JoinColumn(name = "seat_type_id")
	private SeatType seatType;
	private int seatCount;
	
	
}
