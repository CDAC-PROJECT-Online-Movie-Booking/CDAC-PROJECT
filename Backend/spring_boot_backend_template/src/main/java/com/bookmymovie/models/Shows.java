package com.bookmymovie.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data

@Table(name="shows")
public class Shows {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int showId;
	@ManyToOne
	@JoinColumn(name = "hall_id")
	private Screen screen;
	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;
	private int slot;
	private int price;
	private LocalDate fromDate;
	private LocalDate toDate;
	
}
