package com.bookmymovie.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "showtimes")
@Table(name = "movies")

public class Movie {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    @NotBlank
    private String title;

    @Lob
    private String description;

    private String genre;

    @Min(60)
    private Integer duration; // in minutes

    private LocalDate releaseDate;

    private String language;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<ShowTime> showtimes = new ArrayList<>();

}
