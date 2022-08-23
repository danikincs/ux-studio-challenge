package com.uxstudiochallenge.uxstudiochallenge;

import com.uxstudiochallenge.uxstudiochallenge.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

interface ContactRepository extends JpaRepository<Contact, Long> {

}
