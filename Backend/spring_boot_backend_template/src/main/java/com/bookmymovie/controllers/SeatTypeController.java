package com.bookmymovie.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.models.SeatType;
import com.bookmymovie.service.SeatTypeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/seattypes")
public class SeatTypeController {
	@Autowired 
	private SeatTypeService service;

    @PostMapping
    public ResponseEntity<?> saveSeatType(@RequestBody SeatType screen){
        service.save(screen);
        return ResponseEntity.ok().body("SeatType saved successfully");
    }

    @GetMapping
    public ResponseEntity<?> listall(){
        return ResponseEntity.ok(service.listall());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable("id") int id){
        service.deleteSeatType(id);
        return ResponseEntity.ok("SeatType deleted successfully");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findDetails(@PathVariable("id") int id){
        return ResponseEntity.ok().body(service.findById(id));
    }
}
