package com.bookmymovie.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmymovie.models.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    Optional<PaymentMethod> findByName(String name);
    
 // Add this custom query if you need exact match
    @Query("SELECT pm FROM PaymentMethod pm WHERE pm.name = :name")
    Optional<PaymentMethod> findByNameExact(@Param("name") String name);
      
}
