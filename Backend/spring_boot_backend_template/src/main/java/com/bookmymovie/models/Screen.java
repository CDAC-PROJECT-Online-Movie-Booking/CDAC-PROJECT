package com.bookmymovie.models;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="screen")
@Data
public class Screen {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int screenId;
	private String screenDesc;
	private int capacity;
	@OneToMany	
	private List<ScreenCapacity> screenCapacity;
	
	public List<ScreenCapacity> getScreenCapacity() {
		return screenCapacity;
	}
	
}
