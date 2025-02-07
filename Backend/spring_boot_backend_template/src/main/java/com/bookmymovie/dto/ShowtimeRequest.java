package com.bookmymovie.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ShowtimeRequest {
	 @Schema(description = "Start time of the show", example = "14:30:00")
    private LocalTime startTime;
	 @Schema(description = "Start time of the show", example = "14:30:00")
    private LocalTime endTime;
    private LocalDate date;
}
