package com.bookmymovie.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration //equivalent to bean config xml
@EnableWebSecurity //to enable annotation support for spring sec
public class SecurityConfiguration {
//	@Autowired
//	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;
	
	// Configure the bean to customize spring security filter chain
//		@Bean
//		public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
//		{
//			//1. Disable CSRF filter
//			http.csrf(customizer -> customizer.disable())
//			//2. configure URL based access
//	        .authorizeHttpRequests
//	        (request -> 
//	        request.requestMatchers("/api/auth/**","/v3/api-docs/**",
//                    "/swagger-ui/**","/swagger-ui.html"
//                    ).permitAll() 
//	        //required explicitly for JS clients (eg React app - to permit pre flight requests)
//	        .requestMatchers(HttpMethod.OPTIONS).permitAll()
//	        	
////	       .requestMatchers("/products/purchase/**")
////	       .hasRole("USER")
//	       .requestMatchers("/api/admin/**")
//	       .hasRole("ADMIN")        		
//	        .anyRequest().authenticated())  
//	  //      .httpBasic(Customizer.withDefaults()) - replacing it by custom JWT filter
//	        .sessionManagement(session 
//	        		-> session.sessionCreationPolicy(
//	        				SessionCreationPolicy.STATELESS));
//			//adding custom JWT filter before any auth filter
//			http.addFilterBefore(customJWTAuthenticationFilter, 
//					UsernamePasswordAuthenticationFilter.class);
//	        return http.build();
//		}
		 	@Bean
		    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		        http
		            .authorizeHttpRequests(auth -> auth
		                .anyRequest().permitAll()
		            )
		            .csrf(csrf -> csrf.disable())  // Disable CSRF (useful for APIs)
		            .formLogin(form -> form.disable())  // Disable Login Page
		            .httpBasic(basic -> basic.disable());  // Disable Basic Auth

		        return http.build();
		    }
		//to supply Auth Mgr , configure it as a spring bean
		@Bean
		public AuthenticationManager authenticationManager
		(AuthenticationConfiguration config) throws Exception
		{
			return config.getAuthenticationManager();
		}
		
		@Configuration
		public class CorsConfig {

		    @Bean
		    public WebMvcConfigurer corsConfigurer() {
		        return new WebMvcConfigurer() {
		            @Override
		            public void addCorsMappings(CorsRegistry registry) {
		                registry.addMapping("/**")
		                        .allowedOrigins("*")
		                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
		            }
		        };
		    }
		}
		

}
