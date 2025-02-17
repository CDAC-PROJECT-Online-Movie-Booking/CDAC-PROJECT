


//Model no 1 



package com.bookmymovie.models;




import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bookingId;
	@ManyToOne
	@JoinColumn(name = "show_id")
	private Shows show;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	private LocalDate bookDate;
	private LocalDate showDate;
	private String status;
	
	private String seatnos;
	private int noOfSeats;
	private float cost;
	private float cancelCharges;
	
	public Booking() {
		this.bookDate=LocalDate.now();
		this.status="Booked";
	}
	
	
	
	
	
}
