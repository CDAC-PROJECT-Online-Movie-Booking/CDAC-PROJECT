package com.bookmymovie.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.bookmymovie.dto.BookingResponse;
import com.bookmymovie.dto.ShowtimeResponse;
import com.bookmymovie.entity.Booking;
import com.bookmymovie.entity.Showtime;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
            .setMatchingStrategy(MatchingStrategies.STRICT)
            .setSkipNullEnabled(true);

        // Custom mappings
        configureBookingMappings(mapper);
        configureShowtimeMappings(mapper);
        
        return mapper;
    }

    private void configureBookingMappings(ModelMapper mapper) {
        mapper.typeMap(Booking.class, BookingResponse.class)
            .addMappings(m -> {
                m.map(src -> src.getUser().getName(), BookingResponse::setUserName);
                m.map(src -> src.getShowtime().getDateTime(), BookingResponse::setShowtime);
            });
    }

    private void configureShowtimeMappings(ModelMapper mapper) {
        mapper.typeMap(Showtime.class, ShowtimeResponse.class)
            .addMappings(m -> {
                m.map(src -> src.getMovie().getTitle(), ShowtimeResponse::setMovieTitle);
                m.map(src -> src.getScreen().getTheater().getName(), ShowtimeResponse::setTheaterName);
            });
    }
}

