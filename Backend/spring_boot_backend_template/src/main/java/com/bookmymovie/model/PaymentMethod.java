package com.bookmymovie.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor


@AllArgsConstructor
@Table(name = "payment_methods")
public class PaymentMethod {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long methodId;

    @NotBlank
    @Column(unique = true)
    private String name; // e.g., "Credit Card", "UPI"



}
