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

import com.bookmymovie.dto.ScreenCapacityDTO;
import com.bookmymovie.models.Screen;
import com.bookmymovie.service.ScreenService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/screens")
public class ScreenController {
	@Autowired private ScreenService service;

    @PostMapping("seats")
    public ResponseEntity<?> saveScreenSeats(@RequestBody ScreenCapacityDTO hc){
        service.saveCapacity(hc);
        return ResponseEntity.ok().body("Screen Seats saved successfully");
    }
    
    @DeleteMapping("seats/{id}")
    public ResponseEntity<?> deleteSeat(@PathVariable("id") int id){
        service.deleteSeat(id);
        return ResponseEntity.ok("Seat deleted successfully");
    }
    
    @PostMapping
    public ResponseEntity<?> saveScreen(@RequestBody Screen screen){
        service.save(screen);
        return ResponseEntity.ok().body("Screen saved successfully");
    }

    @GetMapping
    public ResponseEntity<?> listall(){
        return ResponseEntity.ok(service.listall());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteScreen(@PathVariable("id") int id){
        service.deleteScreen(id);
        return ResponseEntity.ok("Screen deleted successfully");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findDetails(@PathVariable("id") int id){
        return ResponseEntity.ok().body(service.findById(id));
    }
}
