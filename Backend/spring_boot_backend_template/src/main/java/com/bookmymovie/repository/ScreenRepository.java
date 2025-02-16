package com.bookmymovie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.models.Screen;
import com.bookmymovie.models.Theater;

public interface ScreenRepository extends JpaRepository<Screen, Long> {
    List<Screen> findByTheater(Theater theater);
}