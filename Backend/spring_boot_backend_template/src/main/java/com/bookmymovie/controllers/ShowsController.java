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

import com.bookmymovie.dto.SearchDTO;
import com.bookmymovie.dto.ShowDTO;
import com.bookmymovie.service.ShowsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/shows")
public class ShowsController {
	@Autowired private ShowsService mService;
	

    @PostMapping
    public ResponseEntity<?> saveShow(@RequestBody ShowDTO dto){
    	System.out.println(dto);
        mService.save(dto);
        return ResponseEntity.ok().body("Show saved successfully");
    }

    @GetMapping
    public ResponseEntity<?> listall(){
        return ResponseEntity.ok(mService.listall());
    }
    
    @GetMapping("todays")
    public ResponseEntity<?> todayShows(){
        return ResponseEntity.ok(mService.todayShows());
    }
    

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable("id") int id){
        mService.deleteShow(id);
        return ResponseEntity.ok("Show deleted successfully");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findDetails(@PathVariable("id") int id){
        return ResponseEntity.ok().body(mService.findById(id));
    }
}
