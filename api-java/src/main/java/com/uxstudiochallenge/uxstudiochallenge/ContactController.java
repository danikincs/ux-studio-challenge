package com.uxstudiochallenge.uxstudiochallenge;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.uxstudiochallenge.uxstudiochallenge.model.Contact;
import com.uxstudiochallenge.uxstudiochallenge.storage.StorageService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
class ContactController {

    private final ContactRepository repository;
    private final StorageService storageService;

    ContactController(ContactRepository repository, StorageService storageService) {
        this.storageService = storageService;
        this.repository = repository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/contact")
    List<Contact> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/contact", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Contact newContact(@RequestParam String name, @RequestParam String phone, @RequestParam String email, @RequestPart MultipartFile avatar) {
        System.out.println(name);
        System.out.println(avatar.getOriginalFilename());

        storageService.store(avatar);

        return repository.save(new Contact(name, phone, email, avatar.getOriginalFilename()));

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/contact/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    Optional<Contact> updateContact(@RequestParam String name, @RequestParam String phone, @RequestParam String email, @RequestPart(required = false) MultipartFile avatar, @PathVariable Long id) throws IOException {
        System.out.println(id);
        var contact = repository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));

        if(avatar != null)  {
            storageService.delete(contact.getAvatar());
        }

        storageService.store(avatar);

        return repository.findById(id)
                .map(employee -> {
                    employee.setName(name);
                    employee.setEmail(email);
                    employee.setPhone(phone);
                    if(avatar != null) {
                        employee.setAvatar(avatar.getOriginalFilename());
                    }
                    return repository.save(employee);
                });
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/contact/{id}")
    HashMap<String, String> deleteContact(@PathVariable Long id) throws IOException {

        var contact = repository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));

        if(contact.getAvatar() != null)  {
            storageService.delete(contact.getAvatar());
        }

        repository.deleteById(id);

        HashMap<String, String> map = new HashMap<>();
        map.put("success", "true");
        return(map);
    }
}
