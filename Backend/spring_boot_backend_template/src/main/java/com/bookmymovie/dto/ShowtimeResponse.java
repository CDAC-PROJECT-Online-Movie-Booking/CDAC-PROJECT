package com.bookmymovie.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class ShowtimeResponse {
    private Long showtimeId;
    private LocalTime startTime;
    private LocalDate date;
    private String movieTitle;
    private String theaterName;
}
