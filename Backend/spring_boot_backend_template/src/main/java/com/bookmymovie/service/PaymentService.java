package com.bookmymovie.service;

import com.bookmymovie.model.Booking;
import com.bookmymovie.model.Payment;

public interface PaymentService {
    

    public Payment processPayment(Booking booking, String paymentMethodName);
    public void processRefund(Long paymentId);
}