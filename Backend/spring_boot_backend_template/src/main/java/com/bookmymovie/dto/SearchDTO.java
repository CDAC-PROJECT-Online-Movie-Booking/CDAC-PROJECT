package com.bookmymovie.dto;

import java.time.LocalDate;

public class SearchDTO {

	private int slot;
	private int screenId;
	private String movieName;
	private LocalDate date;
	public int getSlot() {
		return slot;
	}
	public void setSlot(int slot) {
		this.slot = slot;
	}
	public int getScreenId() {
		return screenId;
	}
	public void setScreenId(int hallId) {
		this.screenId = hallId;
	}
	public String getMovieName() {
		return movieName;
	}
	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "SearchDTO [slot=" + slot + ", screenId=" + screenId + ", movieName=" + movieName + ", date=" + date + "]";
	}	
	
	
}
