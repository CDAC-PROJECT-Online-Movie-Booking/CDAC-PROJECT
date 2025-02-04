package com.bookmymovie.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class ShowtimeRequest {
    private Long movieId;
    private Long screenId;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
}
