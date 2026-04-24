package org.jababer.capstoneProject.settings;

import org.bukkit.configuration.file.YamlConfiguration;
import org.jababer.capstoneProject.CapstoneProject;
import org.jababer.capstoneProject.model.Database;

import java.io.File;

/**
 * The settings manager for the project.
 * 
 * Contains methods to load, save, and get an instance of the settings.
 */
public class CapstoneProjectSettings {

    private final static CapstoneProjectSettings instance = new CapstoneProjectSettings();

    private File file;
    private YamlConfiguration config;

    private Database.DatabaseType databaseType;
    private String h2Host;
    private String h2Database;
    private String h2User;
    private String h2Password;
    private int h2Port;


    private CapstoneProjectSettings() {
    }

    /**
     * Load an instance of the settings from the settings file
     * 
     * From a settings file, gathers information needed to access the database
     * and saves the information to access from other classes.
     */
    public void load() {
        file = new File(CapstoneProject.getInstance().getDataFolder(), "settings.yml");

        if (!file.exists()) {
            CapstoneProject.getInstance().saveResource("settings.yml", false);
        }
        config = new YamlConfiguration();
        config.options().parseComments(true);

        try {
            config.load(file);
        } catch (Exception e) {
            e.printStackTrace();
        }

        databaseType = Database.DatabaseType.valueOf(config.getString("Database.Type"));
        h2Host = config.getString("Database.Host");
        h2Database = config.getString("Database.Database");
        h2User = config.getString("Database.Username");
        h2Password = config.getString("Database.Password");
        h2Port = config.getInt("Database.Port");

    }

    /**
     * Attempts to save the file using the games version of the settings.
     */
    public void save() {
        try {
            config.save(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void set(String path, Object value) {
        config.set(path, value);
        save();
    }

    public Database.DatabaseType getDatabaseType() {
        return databaseType;
    }

    public String getH2Password() {
        return h2Password;
    }

    public String getH2Username() {
        return h2User;
    }

    public String getH2Database() {
        return h2Database;
    }

    public String getH2Host() {
        return h2Host;
    }

    public int getH2Port() {
        return h2Port;
    }

    public static CapstoneProjectSettings getInstance() {
        return instance;
    }
}
