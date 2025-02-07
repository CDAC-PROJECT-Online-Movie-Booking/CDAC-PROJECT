package com.bookmymovie.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP for Registration");
        message.setText("Hi "+ name +" ! Welcome to BookMyMovie, \n\n"+""
        		+ "Your OTP is: " + otp + "\n\nPlease use this OTP to verify your email and complete the registration.\n\n"
        		+ "Enjoy Your Movies !!");
        mailSender.send(message);
    }
}
