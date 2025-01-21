package com._pearlsproject.backend.controller;

import com._pearlsproject.backend.dto.LoginUserDto;
import com._pearlsproject.backend.dto.RegisterUserDto;
import com._pearlsproject.backend.dto.VerifyUserDto;
import com._pearlsproject.backend.model.User;
import com._pearlsproject.backend.responses.LoginResponse;
import com._pearlsproject.backend.service.AuthenticationService;
import com._pearlsproject.backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AuthenticationControllerTest {

    private AuthenticationController authenticationController;
    private AuthenticationService authenticationService;
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        authenticationService = mock(AuthenticationService.class);
        jwtService = mock(JwtService.class);
        authenticationController = new AuthenticationController(jwtService, authenticationService);
    }

    @Test
    void testRegisterUser() {
        // Arrange
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setUsername("testUser");
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setPassword("password");

        User mockUser = new User();
        mockUser.setUsername("testUser");
        mockUser.setEmail("test@example.com");

        when(authenticationService.signup(registerUserDto)).thenReturn(mockUser);

        // Act
        ResponseEntity<User> response = authenticationController.register(registerUserDto);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("testUser", response.getBody().getUsername());
        assertEquals("test@example.com", response.getBody().getEmail());
        verify(authenticationService, times(1)).signup(registerUserDto);
    }

    @Test
    void testAuthenticateUser() {
        // Arrange
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("password");

        User mockUser = new User();
        mockUser.setEmail("test@example.com");

        String mockToken = "mockJwtToken";
        long mockExpiration = 123456789L;

        when(authenticationService.authenticate(loginUserDto)).thenReturn(mockUser);
        when(jwtService.generateToken(mockUser)).thenReturn(mockToken);
        when(jwtService.getTokenExpirationTime()).thenReturn(new Date(mockExpiration));

        // Act
        ResponseEntity<LoginResponse> response = authenticationController.authenticate(loginUserDto);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockToken, response.getBody().getToken());
        assertEquals(mockExpiration, response.getBody().getExpiresIn());
        verify(authenticationService, times(1)).authenticate(loginUserDto);
    }

    @Test
    void testVerifyUser() {
        // Arrange
        VerifyUserDto verifyUserDto = new VerifyUserDto();
        verifyUserDto.setEmail("test@example.com");
        verifyUserDto.setVerificationCode("123456");

        doNothing().when(authenticationService).verifyUser(verifyUserDto);

        // Act
        ResponseEntity<?> response = authenticationController.verifyUser(verifyUserDto);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Account verified successfully", response.getBody());
        verify(authenticationService, times(1)).verifyUser(verifyUserDto);
    }

    @Test
    void testResendVerificationCode() {
        // Arrange
        String email = "test@example.com";

        doNothing().when(authenticationService).resendVerificationCode(email);

        // Act
        ResponseEntity<?> response = authenticationController.resendVerificationCode(email);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Verification code sent", response.getBody());
        verify(authenticationService, times(1)).resendVerificationCode(email);
    }
}
