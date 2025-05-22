package com.mantenimiento.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mantenimiento.jwt.JwtService;
import com.mantenimiento.user.Role;
import com.mantenimiento.user.User;
import com.mantenimiento.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RevokedTokenRepository revokedTokenRepository;

    public AuthResponse login(LoginRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();

    }

    public AuthResponse register(RegisterRequest request) {
        boolean existsByUsername = userRepository.existsByUsername(request.getUsername());
        System.out.println("El método existsByUsername retorna: " + existsByUsername);

        if (existsByUsername) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de usuario " + request.getUsername()
                    + " ya existe, no pueden duplicarse, verifique que sea el correcto");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .country(request.getCountry())
                .role(Role.USER)
                .build();
        userRepository.save(user);
        UserDetails userDetails = userRepository.findByUsername(request.getUsername()).orElseThrow();
        return AuthResponse.builder()
                .token(jwtService.getToken(userDetails))
                .build();
    }

    public void invalidateToken(String token) {
        RevokedToken revokedToken = new RevokedToken(token);
        revokedTokenRepository.save(revokedToken);
    }

}