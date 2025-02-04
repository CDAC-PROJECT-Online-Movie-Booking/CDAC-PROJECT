package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.model.Screen;
import com.bookmymovie.model.Theater;

public interface ScreenRepository extends JpaRepository<Screen, Long> {
    List<Screen> findByTheater(Theater theater);
}