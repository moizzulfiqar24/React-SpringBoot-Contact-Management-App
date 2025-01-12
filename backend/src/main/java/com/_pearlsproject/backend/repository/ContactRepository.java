package com._pearlsproject.backend.repository;

import com._pearlsproject.backend.model.Contact;
import com._pearlsproject.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUser(User user);
}