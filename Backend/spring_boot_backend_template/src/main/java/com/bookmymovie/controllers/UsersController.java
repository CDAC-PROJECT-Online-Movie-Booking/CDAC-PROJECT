package com.bookmymovie.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.dto.AuthResponse;
import com.bookmymovie.dto.LoginDTO;
import com.bookmymovie.dto.UserDTO;
import com.bookmymovie.models.User;
import com.bookmymovie.security.JwtUtils;
import com.bookmymovie.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UsersController {

	@Autowired 
	private UserService service;
	
	@Autowired
	private 
	AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registerNewUser(dto));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> validate(@RequestBody LoginDTO dto){
    	UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(),dto.getPassword());
    	
    	Authentication authToken = authenticationManager.authenticate(authenticationToken);
    	User user = service.findByEmail(dto.getEmail());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(user, jwtUtils.generateJwtToken(authToken)));
//        User user=service.validate(dto);
//        if(user!=null) {
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.badRequest().body("Invalid username or password");
//        }
    }

    @GetMapping
    public ResponseEntity<?> listall(){
        return ResponseEntity.ok(service.listall());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findDetails(@PathVariable("id") int id){
        return ResponseEntity.ok().body(service.findById(id));
    }
}
