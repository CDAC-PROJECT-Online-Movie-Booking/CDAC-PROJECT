package com.bookmymovie.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.NoArgsConstructor;
import lombok.*;
import lombok.Builder.Default;



@Entity
@NoArgsConstructor
@AllArgsConstructor        
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = {"createdAt","bookings","password"})
public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank
    private String name;

    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
    
    
    @Column(name = "status", nullable = false,columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean status=true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    
}
