package com.mantenimiento.mailSender;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    @Autowired
    private final JavaMailSender mailSender;

    @Autowired
    private final VerificationCodeService verificationCodeService;

    public void sendVerificationCode(String toEmail) {
        String code = generateVerificationCode();

        verificationCodeService.saveVerificationCode(toEmail, code);
    
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Código de verificación");
        message.setText("Tu código de verificación es: " + code);

        mailSender.send(message);
    }

    public String generateVerificationCode() {
    SecureRandom random = new SecureRandom();
    int code = 1000 + random.nextInt(9000); // Genera un número entre 1000 y 9999
    return String.valueOf(code);
}
}
