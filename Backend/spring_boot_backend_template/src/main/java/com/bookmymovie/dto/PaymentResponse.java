package com.bookmymovie.dto;

import com.bookmymovie.model.PaymentStatus;

import lombok.Data;

@Data
public class PaymentResponse {
    private Long paymentId;
    private Double amount;
    private PaymentStatus status;
    private String paymentMethod;
}
