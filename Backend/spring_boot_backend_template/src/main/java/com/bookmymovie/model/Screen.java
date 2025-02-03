package com.bookmymovie.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bookmymovie.model.User.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@Table(name = "screens")
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
    private List<ShowTime> showtimes = new ArrayList<>();
}
