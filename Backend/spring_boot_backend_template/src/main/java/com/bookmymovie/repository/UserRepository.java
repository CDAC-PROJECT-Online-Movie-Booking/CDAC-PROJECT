package com.bookmymovie.repository;
 

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmymovie.model.Role;
import com.bookmymovie.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByEmail(String email);
	
    List<User> findByRole(Role role);
    
}