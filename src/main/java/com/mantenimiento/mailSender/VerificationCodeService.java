package com.mantenimiento.mailSender;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class VerificationCodeService {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public void saveVerificationCode(String email, String code) {
        stringRedisTemplate.opsForValue().set(email, code, 5, TimeUnit.MINUTES);
    }

    public boolean validateCode(String email, String inputCode) {
        System.out.println("El codigo recibido es " + inputCode);
        System.out.println("El username es " + email);
        String storedCode = stringRedisTemplate.opsForValue().get(email);
        return storedCode != null && storedCode.equals(inputCode);
    }
}
