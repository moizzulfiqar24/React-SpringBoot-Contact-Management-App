package com._pearlsproject.backend.dto;

import com._pearlsproject.backend.model.Contact;

public class ContactDTO {
    private String name;
    private String email;
    private long phone;
    private String address;

    // Constructor to map `Contact` to `ContactDTO`
    public ContactDTO(Contact contact) {
        this.name = contact.getName();
        this.email = contact.getEmail();
        this.phone = contact.getPhone();
        this.address = contact.getAddress();
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public long getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }
}
