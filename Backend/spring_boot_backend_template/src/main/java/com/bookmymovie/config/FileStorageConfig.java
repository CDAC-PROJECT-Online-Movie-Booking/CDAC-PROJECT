package com.bookmymovie.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class FileStorageConfig {

 @Bean
 public StandardServletMultipartResolver multipartResolver() {
     return new StandardServletMultipartResolver();
 }

 @Bean
 public String fileUploadDir() {
     return "/path/to/upload/directory"; // Update with your actual upload directory
 }
}