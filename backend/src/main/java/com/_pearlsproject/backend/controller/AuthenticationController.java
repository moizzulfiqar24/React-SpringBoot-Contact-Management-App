package com._pearlsproject.backend.controller;

import com._pearlsproject.backend.dto.LoginUserDto;
import com._pearlsproject.backend.dto.RegisterUserDto;
import com._pearlsproject.backend.dto.VerifyUserDto;
import com._pearlsproject.backend.model.User;
import com._pearlsproject.backend.responses.LoginResponse;
import com._pearlsproject.backend.service.AuthenticationService;
import com._pearlsproject.backend.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*")
@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        logger.info("Registering user with details: {}", registerUserDto);
        User registeredUser = authenticationService.signup(registerUserDto);
        logger.info("User registered successfully: {}", registeredUser);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        logger.info("Authenticating user with email: {}", loginUserDto.getEmail());
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        logger.info("User authenticated successfully: {}", authenticatedUser);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        Date expirationDate = jwtService.getTokenExpirationTime();
        LoginResponse loginResponse = new LoginResponse(jwtToken, expirationDate.getTime());
        logger.info("JWT token generated: {}", jwtToken);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        logger.info("Verifying user with details: {}", verifyUserDto);
        try {
            authenticationService.verifyUser(verifyUserDto);
            logger.info("User verified successfully");
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            logger.error("Error verifying user: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        logger.info("Resending verification code to email: {}", email);
        try {
            authenticationService.resendVerificationCode(email);
            logger.info("Verification code sent successfully to email: {}", email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            logger.error("Error resending verification code: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}