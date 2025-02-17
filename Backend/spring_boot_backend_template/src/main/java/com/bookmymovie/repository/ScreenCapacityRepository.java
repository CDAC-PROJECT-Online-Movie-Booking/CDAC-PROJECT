package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookmymovie.models.Screen;
import com.bookmymovie.models.ScreenCapacity;

@Repository
public interface ScreenCapacityRepository extends JpaRepository<ScreenCapacity, Integer> {
	
	List<ScreenCapacity> findByScreen(Screen screen);

}
