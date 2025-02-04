package com.bookmymovie.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.model.Booking;
import com.bookmymovie.model.Payment;
import com.bookmymovie.model.PaymentMethod;
import com.bookmymovie.model.PaymentStatus;
import com.bookmymovie.repository.PaymentMethodRepository;
import com.bookmymovie.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	@Autowired
    private PaymentRepository paymentRepo;
	@Autowired
    private PaymentMethodRepository paymentMethodRepo;

    public Payment processPayment(Booking booking, String paymentMethodName) {
        PaymentMethod method = paymentMethodRepo.findByName(paymentMethodName)
                .orElseThrow(() -> new ResourceNotFoundException("Payment method not found"));
        
        Payment payment = new Payment();
        payment.setAmount(booking.getTotalAmount());
        payment.setPaymentMethod(method);
        payment.setStatus(PaymentStatus.SUCCESS);
        return paymentRepo.save(payment);
    }

    public void processRefund(Long paymentId) {
        Payment payment = paymentRepo.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
        payment.setStatus(PaymentStatus.FAILED);
        paymentRepo.save(payment);
    }
}