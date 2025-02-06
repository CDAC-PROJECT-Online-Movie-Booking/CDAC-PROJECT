package com.bookmymovie.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequest {
	
	
	    private String title;
	    private String description;
	    private String genre;
	    private Integer duration;
	    private LocalDate releaseDate;
	    private String language;
	    
	 
	
}
