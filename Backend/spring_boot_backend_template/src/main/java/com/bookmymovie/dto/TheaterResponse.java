package com.bookmymovie.dto;

import lombok.Data;

@Data
public class TheaterResponse {
    private Long theaterId;
    private String name;
    private String address;
    private String cityName;
}
