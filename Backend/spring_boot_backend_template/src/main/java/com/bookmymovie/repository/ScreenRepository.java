package com.bookmymovie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookmymovie.models.Screen;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Integer> {

}