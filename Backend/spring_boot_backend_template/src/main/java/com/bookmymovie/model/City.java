package com.bookmymovie.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="cities")
public class City {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)	
private Long cityId;

@NotBlank
@Column(unique=true)
private String name;
}


  
