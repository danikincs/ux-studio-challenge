package com.uxstudiochallenge.uxstudiochallenge;
class ContactNotFoundException extends RuntimeException {

    ContactNotFoundException(Long id) {
        super("Could not find contact " + id);
    }
}