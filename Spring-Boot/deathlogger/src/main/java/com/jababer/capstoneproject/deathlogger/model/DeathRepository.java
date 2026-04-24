package com.jababer.capstoneproject.deathlogger.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeathRepository extends JpaRepository<Death, Integer> {
    
}
