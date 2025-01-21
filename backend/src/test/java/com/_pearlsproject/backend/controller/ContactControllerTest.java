package com._pearlsproject.backend.controller;

import com._pearlsproject.backend.dto.ContactDTO;
import com._pearlsproject.backend.exception.ContactNotFoundException;
import com._pearlsproject.backend.model.Contact;
import com._pearlsproject.backend.model.User;
import com._pearlsproject.backend.repository.ContactRepository;
import com.cloudinary.Cloudinary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.lang.reflect.Field;

import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ContactControllerTest {

    private MockMvc mockMvc;
    private ContactRepository contactRepository;
    private Cloudinary cloudinary;
    private ContactController contactController;

    @BeforeEach
    void setUp() throws Exception {
        contactRepository = mock(ContactRepository.class);
        cloudinary = mock(Cloudinary.class);

        contactController = new ContactController("dkgkqjeun", "343181185752538", "p2OezeNRLnx7HDIGtHvLItJAl54");

        // Use reflection to inject the mocked repository
        Field repositoryField = ContactController.class.getDeclaredField("contactRepository");
        repositoryField.setAccessible(true); // Make private field accessible
        repositoryField.set(contactController, contactRepository);

        mockMvc = MockMvcBuilders.standaloneSetup(contactController).build();
    }

    @Test
    void testNewContact() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("test@example.com");

        Contact mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setName("John Doe");
        mockContact.setEmail("john@example.com");

        when(contactRepository.save(any(Contact.class))).thenReturn(mockContact);

        // Load test image from resources
        MockMultipartFile imageFile = new MockMultipartFile(
                "image",
                "testImage.png",
                MediaType.IMAGE_PNG_VALUE,
                this.getClass().getResourceAsStream("/images/testImage.png")
        );

        // Act & Assert
        mockMvc.perform(multipart("/contact")
                        .file(imageFile)
                        .param("name", "John Doe")
                        .param("email", "john@example.com")
                        .param("phone", "1234567890")
                        .param("address", "123 Street")
                        .param("isFavourite", "true")
                        .with(request -> {
                            request.setAttribute("user", mockUser);
                            return request;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John Doe")))
                .andExpect(jsonPath("$.email", is("john@example.com")));
    }

    @Test
    void testGetAllContacts() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("test@example.com");

        Contact mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setName("John Doe");

        when(contactRepository.findByUser(mockUser)).thenReturn(Collections.singletonList(mockContact));

        // Act & Assert
        mockMvc.perform(get("/contact/all")
                        .with(request -> {
                            request.setAttribute("user", mockUser);
                            return request;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name", is("John Doe")));
    }

    @Test
    void testGetContactById() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1L);

        Contact mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setName("John Doe");
        mockContact.setUser(mockUser);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(mockContact));

        // Act & Assert
        mockMvc.perform(get("/contact/1")
                        .with(request -> {
                            request.setAttribute("user", mockUser);
                            return request;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John Doe")));
    }

    @Test
    void testUpdateContact() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1L);

        Contact mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setName("John Doe");
        mockContact.setUser(mockUser);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(mockContact));
        when(contactRepository.save(any(Contact.class))).thenReturn(mockContact);

        // Act & Assert
        mockMvc.perform(put("/contact/1")
                        .param("name", "Updated Name")
                        .param("email", "updated@example.com")
                        .param("phone", "9876543210")
                        .param("address", "Updated Address")
                        .param("isFavourite", "false")
                        .with(request -> {
                            request.setAttribute("user", mockUser);
                            return request;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Name")));
    }

    @Test
    void testDeleteContact() throws Exception {
        // Arrange
        User mockUser = new User();
        mockUser.setId(1L);

        Contact mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setUser(mockUser);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(mockContact));
        doNothing().when(contactRepository).delete(mockContact);

        // Act & Assert
        mockMvc.perform(delete("/contact/1")
                        .with(request -> {
                            request.setAttribute("user", mockUser);
                            return request;
                        }))
                .andExpect(status().isOk());
    }
}
