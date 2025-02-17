package com.bookmymovie.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmymovie.exception.ResourceNotFoundException;
import com.bookmymovie.models.Booking;
import com.bookmymovie.models.Payment;
import com.bookmymovie.models.ScreenCapacity;
import com.bookmymovie.models.PaymentStatus;
import com.bookmymovie.repository.PaymentMethodRepository;
import com.bookmymovie.repository.PaymentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {
	@Autowired
    private PaymentRepository paymentRepo;
	@Autowired
    private PaymentMethodRepository paymentMethodRepo;

    public Payment processPayment(Booking booking, String paymentMethodName) {
        ScreenCapacity method = paymentMethodRepo.findByName(paymentMethodName)
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
        payment.setStatus(PaymentStatus.REFUNDED);
        paymentRepo.save(payment);
    }
}