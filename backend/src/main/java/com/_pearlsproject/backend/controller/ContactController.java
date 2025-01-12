package com._pearlsproject.backend.controller;

import com._pearlsproject.backend.dto.ContactDTO;
import com._pearlsproject.backend.exception.ContactNotFoundException;
import com._pearlsproject.backend.model.Contact;
import com._pearlsproject.backend.model.User;
import com._pearlsproject.backend.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/contact")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private ContactRepository contactRepository;

    // Create a new contact for the authenticated user
    @PostMapping
    public ContactDTO newContact(@RequestBody Contact newContact, @AuthenticationPrincipal User user) {
        if (user == null) {
            logger.error("User is not authenticated.");
            throw new RuntimeException("User is not authenticated. Please log in.");
        }

        logger.info("Creating new contact for user: {}", user.getEmail());
        newContact.setUser(user);  // Set the current user as the contact owner
        Contact savedContact = contactRepository.save(newContact);
        logger.info("Contact saved with ID: {}", savedContact.getId());
        return new ContactDTO(savedContact);
    }

    // Get all contacts of the authenticated user
    @GetMapping("/all")
    public List<ContactDTO> getAllContacts(@AuthenticationPrincipal User user) {
        if (user == null) {
            throw new RuntimeException("User is not authenticated.");
        }

        logger.info("Fetching contacts for user: {}", user.getEmail());
        List<Contact> contacts = contactRepository.findByUser(user);  // Fetch all contacts for the logged-in user
        return contacts.stream().map(ContactDTO::new).collect(Collectors.toList());
    }

    // Get a specific contact by ID, only if it belongs to the authenticated user
    @GetMapping("/{id}")
    public ContactDTO getContactById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        logger.info("Fetching contact with ID: {} for user: {}", id, user.getEmail());
        Contact contact = contactRepository.findById(id)
                .filter(c -> c.getUser().getId().equals(user.getId()))  // Compare user IDs instead of objects
                .orElseThrow(() -> new ContactNotFoundException(id));
        return new ContactDTO(contact);
    }

    // Update a contact for the authenticated user
    @PutMapping("/{id}")
    public ContactDTO updateContact(@RequestBody Contact updatedContactDetails, @PathVariable Long id, @AuthenticationPrincipal User user) {
        logger.info("Updating contact with ID: {} for user: {}", id, user.getEmail());
        Contact updatedContact = contactRepository.findById(id)
                .filter(contact -> contact.getUser().getId().equals(user.getId()))  // Compare user IDs
                .map(contact -> {
                    contact.setName(updatedContactDetails.getName());
                    contact.setEmail(updatedContactDetails.getEmail());
                    contact.setPhone(updatedContactDetails.getPhone());
                    contact.setAddress(updatedContactDetails.getAddress());
                    return contactRepository.save(contact);
                }).orElseThrow(() -> new ContactNotFoundException(id));
        logger.info("Contact updated successfully with ID: {}", updatedContact.getId());
        return new ContactDTO(updatedContact);
    }

    // Delete a contact for the authenticated user
    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable Long id, @AuthenticationPrincipal User user) {
        logger.info("Deleting contact with ID: {} for user: {}", id, user.getEmail());
        return contactRepository.findById(id)
                .filter(contact -> contact.getUser().getId().equals(user.getId()))  // Compare user IDs
                .map(contact -> {
                    contactRepository.delete(contact);
                    logger.info("Contact deleted with ID: {}", id);
                    return "Contact deleted (ID = " + id + ")";
                }).orElseThrow(() -> new ContactNotFoundException(id));
    }
}
