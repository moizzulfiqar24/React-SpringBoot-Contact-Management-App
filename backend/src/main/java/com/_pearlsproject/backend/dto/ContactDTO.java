package com._pearlsproject.backend.dto;

import com._pearlsproject.backend.model.Contact;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ContactDTO {
    private Long id;
    private String name;
    private String email;
    private long phone;
    private String address;
    private String image;
    private boolean isFavourite;

    public ContactDTO(Contact contact) {
        this.id = contact.getId();
        this.name = contact.getName();
        this.email = contact.getEmail();
        this.phone = contact.getPhone();
        this.address = contact.getAddress();
        this.image = contact.getImage();
        this.isFavourite = contact.isFavourite();
    }

    public Long getId() {
        return id;  // Add getter for ID
    }

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

    public String getImage() {
        return image;
    }

    @JsonProperty("isFavourite")
    public boolean isFavourite() {
        return isFavourite;
    }
}
