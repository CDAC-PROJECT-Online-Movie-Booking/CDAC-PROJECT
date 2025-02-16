package com.bookmymovie.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.models.ScreenCapacity;

public interface PaymentMethodRepository extends JpaRepository<ScreenCapacity, Long> {
    Optional<ScreenCapacity> findByName(String name);
    
 // Add this custom query if you need exact match
    @Query("SELECT pm FROM PaymentMethod pm WHERE pm.name = :name")
    Optional<ScreenCapacity> findByNameExact(@Param("name") String name);
      
}
