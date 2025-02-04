package com.bookmymovie.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponse {
	    private Long movieId;
	    private String title;
	    private String genre;
	    private Integer duration;
	    private LocalDate releaseDate;
	    
}
