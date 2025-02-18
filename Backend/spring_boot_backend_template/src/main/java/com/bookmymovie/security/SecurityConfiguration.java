package com.bookmymovie.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import com.bookmymovie.config.CorsConfig;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomUserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private CustomJWTAuthenticationFilter  customJwtAuthenticationFilter;
	
	
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
		http
		.cors(cors -> cors.configurationSource(new CorsConfig().corsConfigurationSource())) // Use the CORS config
		.csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
		.authorizeHttpRequests(
				
				request -> request.requestMatchers(
						"/**",
						"/api/users/register",
						"/api/users/login",
						"/api/shows/todays",
						"/api/screens",
						"/{fileName}",
						"/v*/api-doc*/**",
						"/swagger-ui/**").permitAll()
				.requestMatchers(HttpMethod.OPTIONS).permitAll()
				.requestMatchers(
							"/api/movies",
							"/api/bookings" ,
							"/api/bookings/{id}",
							"/api/bookings/check",
							"/api/bookings?userid={id}",
							"/api/screens",
							"/api/screens/seats",
							"/api/screens/{id}",
							"/api/shows/{id}"
						).hasRole("USER")
				.requestMatchers(
						"/api/movies",
						"/api/shows/",
						"/api/bookings",
						"/api/movies/{id}",
						"/api/bookings/{id}",
						"/api/screens",
						"/api/bookings",
						"/api/users?"
						).hasRole("ADMIN")
				.anyRequest().authenticated())
		.sessionManagement( session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterBefore(customJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
		
		
	}
	
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {
	    return http.getSharedObject(AuthenticationManagerBuilder.class)
	               .userDetailsService(userDetailsService)
	               .passwordEncoder(passwordEncoder)
	               .and()
	               .build();
	}
	 
}
