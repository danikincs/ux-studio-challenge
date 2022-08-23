package com.uxstudiochallenge.uxstudiochallenge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Contact {

    private @Id @GeneratedValue Long id;
    private String name;
    private String phone;
    private String email;
    private String avatar;

    Contact() {}

    public Contact(String name, String phone, String email, String avatar) {

        this.name = name;
        this.phone = phone;
        this.email = email;
        this.avatar = avatar;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getEmail() {
        return this.email;
    }

    public String getAvatar() {
        return this.avatar;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
