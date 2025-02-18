package com.bookmymovie.dto;

import com.bookmymovie.models.ScreenCapacity;

public class ScreenCapacityDTO extends ScreenCapacity {
	private int seatTypeId;
	private int screenId;

	public int getScreenId() {
		return screenId;
	}

	public void setScreenId(int screenId) {
		this.screenId = screenId;
	}

	public int getSeatTypeId() {
		return seatTypeId;
	}

	public void setSeatTypeId(int seatTypeId) {
		this.seatTypeId = seatTypeId;
	}
	
}
