package com.jababer.capstoneproject.deathlogger.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "death_log")
public class Death {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NonNull
    private String killerName;
    @NonNull
    private String victimUuid;
    @NonNull
    private String victimName;
    @NonNull
    private String message;
    @NonNull
    private int victimNewLives;
    @NonNull
    private Timestamp timestamp;
    private String description;
}
