package com.jababer.capstoneproject.deathlogger.web;

import com.jababer.capstoneproject.deathlogger.model.Death;
import com.jababer.capstoneproject.deathlogger.model.DeathRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Optional;

import static com.jababer.capstoneproject.deathlogger.ServerIP.serverIP;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://" + serverIP + ":5173", "http://localhost:5173"})
class DeathController {

    private final Logger log = LoggerFactory.getLogger(DeathController.class);
    private DeathRepository deathRepository;

    public DeathController(DeathRepository deathRepository) {
        this.deathRepository = deathRepository;
    }


    // Returns all deaths in database
    @GetMapping("/deaths")
    Collection<Death> deaths() {
        return deathRepository.findAll();
    }

    // Deletes requested item from database
    @DeleteMapping("/deaths/delete/{id}")
    public ResponseEntity<?> deleteDeathById(@PathVariable int id) {
        log.info("Request to delete death: {}", id);
        deathRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Sets requested items description to a specified description
    @PatchMapping("/deaths/patch/{id}")
    @Valid
    public ResponseEntity<?> patchDeathById(@PathVariable int id,
         @RequestBody String description) {
        log.info("Request to patch death: {}", id);
        Optional<Death> death = deathRepository.findById(id);
        if (death.isPresent()) {
            death.get().setDescription(description);
            deathRepository.save(death.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Creates new death in database
    @PostMapping("/deaths/post/")
    @Valid
    public ResponseEntity<?> postDeath(@RequestBody Death death) {
        log.info("Request to post death: {}", death);
        deathRepository.save(death);
        return ResponseEntity.ok().build();
    }
}