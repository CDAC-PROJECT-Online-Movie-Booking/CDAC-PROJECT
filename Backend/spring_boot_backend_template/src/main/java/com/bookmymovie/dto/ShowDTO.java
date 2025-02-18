package com.bookmymovie.dto;

import com.bookmymovie.models.Shows;

public class ShowDTO extends Shows {

	private int screenId;
	private int movieId;
	public int getScreenId() {
		return screenId;
	}
	public void setScreenId(int screenId) {
		this.screenId = screenId;
	}
	public int getMovieId() {
		return movieId;
	}
	public void setMovieId(int movieId) {
		this.movieId = movieId;
	}
	@Override
	public String toString() {
		return "ShowDTO [screenId=" + screenId + ", movieId=" + movieId + "]";
	}
	
	
}
