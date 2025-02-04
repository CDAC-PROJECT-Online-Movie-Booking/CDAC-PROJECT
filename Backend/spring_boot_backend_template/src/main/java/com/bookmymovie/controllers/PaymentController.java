package com.bookmymovie.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmymovie.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/{paymentId}/refund")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> processRefund(@PathVariable Long paymentId) {
        paymentService.processRefund(paymentId);
        return ResponseEntity.noContent().build();
    }
}