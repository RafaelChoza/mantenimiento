package com.mantenimiento.mailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mantenimiento.auth.UpdatePasswordRequest;

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
        System.out.println("El codigo recibido es " + inputCode);
        System.out.println("El username es " + email);
        boolean isValid = verificationCodeService.validateCode(email, inputCode);

        if (isValid) {
            return "Código válido, puedes restablecer tu contraseña";
        } else {
            return "Código incorrecto, inténtalo de nuevo";
        }
    }

    @PostMapping("/actualizar-contrasena-codigo")
    public ResponseEntity<?> actualizarContraseñaCódigo(@RequestBody UpdatePasswordRequest request) {
        System.out.println("datos recibidos :" + request);
        emailSenderService.updatePasswordNoOldPassword(request.getUsername(), request.getNewPassword(),
                request.getNewPassword2());
        return ResponseEntity.ok("Contraseña actualizada mediante código");
    }

}
