package com.bookmymovie.service;

import com.bookmymovie.models.Booking;
import com.bookmymovie.models.Payment;

public interface PaymentService {
    

    public Payment processPayment(Booking booking, String paymentMethodName);
    public void processRefund(Long paymentId);
}