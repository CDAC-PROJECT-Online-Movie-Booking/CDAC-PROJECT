package com.bookmymovie.model;

import java.time.LocalDateTime;
import java.util.List;

import com.bookmymovie.model.User.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "payment_methods")
public class PaymentMethod {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long methodId;

    @NotBlank
    @Column(unique = true)
    private String name; // e.g., "Credit Card", "UPI"



}
