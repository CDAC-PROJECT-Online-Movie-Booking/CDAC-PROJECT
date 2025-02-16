package com.bookmymovie.models;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "screens")
@ToString(exclude = {"seats","showtimes"})
public class Screen {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long screenId;
	
	@NotBlank
    private String name;
	
	private Integer capacity;
	
	@ManyToOne
    @JoinColumn(name = "theater_id")
    private Theater theater;

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
    private List<Seat> seats = new ArrayList<>();

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
    private List<Showtime> showtimes = new ArrayList<>();
}
