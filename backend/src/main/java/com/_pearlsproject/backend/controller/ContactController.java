package com._pearlsproject.backend.controller;

import com._pearlsproject.backend.dto.ContactDTO;
import com._pearlsproject.backend.exception.ContactNotFoundException;
import com._pearlsproject.backend.model.Contact;
import com._pearlsproject.backend.model.User;
import com._pearlsproject.backend.repository.ContactRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/contact")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private ContactRepository contactRepository;

    private final Cloudinary cloudinary;

    @Autowired
    public ContactController(@Value("${cloudinary.cloud-name}") String cloudName,
                             @Value("${cloudinary.api-key}") String apiKey,
                             @Value("${cloudinary.api-secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
        logger.info("Cloudinary initialized successfully.");
    }

    @PostMapping
    public ContactDTO newContact(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") long phone,
            @RequestParam("address") String address,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "isFavourite", required = false, defaultValue = "false") boolean isFavourite,
            @AuthenticationPrincipal User user) throws IOException {

        logger.debug("New contact creation request received: name={}, email={}, phone={}, isFavourite={}", name, email, phone, isFavourite);

        if (user == null) {
            logger.error("User is not authenticated.");
            throw new RuntimeException("User is not authenticated. Please log in.");
        }

        String imageUrl = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            logger.info("Uploading image to Cloudinary...");
            Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
            imageUrl = uploadResult.get("secure_url").toString();
            logger.info("Image uploaded successfully: {}", imageUrl);
        }

        logger.info("Creating new contact for user: {}", user.getEmail());
        Contact newContact = new Contact();
        newContact.setName(name);
        newContact.setEmail(email);
        newContact.setPhone(phone);
        newContact.setAddress(address);
        newContact.setImage(imageUrl);
        newContact.setFavourite(isFavourite);
        newContact.setUser(user);

        Contact savedContact = contactRepository.save(newContact);
        logger.info("Contact saved with ID: {}", savedContact.getId());
        return new ContactDTO(savedContact);
    }

    @GetMapping("/all")
    public List<ContactDTO> getAllContacts(@AuthenticationPrincipal User user) {
        logger.debug("Fetching all contacts for user.");

        if (user == null) {
            logger.error("User is not authenticated.");
            throw new RuntimeException("User is not authenticated.");
        }

        logger.info("Fetching contacts for user: {}", user.getEmail());
        List<Contact> contacts = contactRepository.findByUser(user);
        logger.info("{} contacts found for user: {}", contacts.size(), user.getEmail());
        return contacts.stream().map(ContactDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ContactDTO getContactById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        logger.debug("Fetching contact by ID: {}", id);

        if (user == null) {
            logger.error("User is not authenticated.");
            throw new RuntimeException("User is not authenticated.");
        }

        logger.info("Fetching contact with ID: {} for user: {}", id, user.getEmail());
        Contact contact = contactRepository.findById(id)
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> {
                    logger.error("Contact with ID: {} not found or does not belong to user: {}", id, user.getEmail());
                    return new ContactNotFoundException(id);
                });
        logger.info("Contact with ID: {} retrieved successfully.", id);
        return new ContactDTO(contact);
    }

    @PutMapping("/{id}")
    public ContactDTO updateContact(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") long phone,
            @RequestParam("address") String address,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "isFavourite", required = false, defaultValue = "false") boolean isFavourite,
            @AuthenticationPrincipal User user) throws IOException {

        logger.debug("Updating contact with ID: {}", id);

        if (user == null) {
            logger.error("User is not authenticated.");
            throw new RuntimeException("User is not authenticated.");
        }

        logger.info("Updating contact with ID: {} for user: {}", id, user.getEmail());
        Contact updatedContact = contactRepository.findById(id)
                .filter(contact -> contact.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> {
                    logger.error("Contact with ID: {} not found or does not belong to user: {}", id, user.getEmail());
                    return new ContactNotFoundException(id);
                });

        updatedContact.setName(name);
        updatedContact.setEmail(email);
        updatedContact.setPhone(phone);
        updatedContact.setAddress(address);
        updatedContact.setFavourite(isFavourite);

        if (imageFile != null && !imageFile.isEmpty()) {
            logger.info("Updating image for contact...");
            Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
            updatedContact.setImage(uploadResult.get("secure_url").toString());
            logger.info("Image updated successfully for contact with ID: {}", id);
        }

        Contact savedContact = contactRepository.save(updatedContact);
        logger.info("Contact updated successfully with ID: {}", savedContact.getId());
        return new ContactDTO(savedContact);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id, @AuthenticationPrincipal User user) {
        logger.debug("Deleting contact with ID: {}", id);

        if (user == null) {
            logger.error("User is not authenticated.");
            throw new RuntimeException("User is not authenticated.");
        }

        logger.info("Deleting contact with ID: {} for user: {}", id, user.getEmail());
        Contact contact = contactRepository.findById(id)
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> {
                    logger.error("Contact with ID: {} not found or does not belong to user: {}", id, user.getEmail());
                    return new ContactNotFoundException(id);
                });

        contactRepository.delete(contact);
        logger.info("Contact with ID: {} deleted successfully.", id);
    }
}
