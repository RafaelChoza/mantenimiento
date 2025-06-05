package com.mantenimiento.mailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("email/")
public class EmailSenderController {

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String to) {
        System.out.println("Se recibe el correo: " + to);
        emailSenderService.sendVerificationCode(to);
        return "Correo enviado exitosamente";
    }

    @PostMapping("/validate")
    public String validateCode(@RequestParam String email, @RequestParam String inputCode) {
        boolean isValid = verificationCodeService.validateCode(email, inputCode);

        if (isValid) {
            return "Código válido, puedes restablecer tu contraseña";
        } else {
            return "Código incorrecto, inténtalo de nuevo";
        }
    }

}
