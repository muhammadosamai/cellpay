package com.celltopay.payments;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;

@RestController
@RequestMapping("/process")
public class PaymentController {

    @PostMapping
    public ResponseEntity<?> processPayment(@Valid @RequestBody PaymentRequest request) {
        // Validate transaction (e.g., check balance, fraud detection)
        if (request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Invalid amount");
        }

        // Process payment (in production, integrate with bank APIs)
        String transactionId = "txn_" + System.currentTimeMillis();
        
        return ResponseEntity.ok(new PaymentResponse(
            transactionId, 
            "SUCCESS", 
            request.getAmount()
        ));
    }
}

// DTOs
record PaymentRequest(
    @NotBlank String senderAccount,
    @NotBlank String receiverAccount,
    @Positive double amount,
    @NotBlank String currency
) {}

record PaymentResponse(
    String transactionId, 
    String status, 
    double amount
) {}