package org.jababer.capstoneProject;

import org.bukkit.plugin.java.JavaPlugin;
import org.jababer.capstoneProject.listener.EntityListener;
import org.jababer.capstoneProject.model.Database;
import org.jababer.capstoneProject.settings.CapstoneProjectSettings;

/**
 * The main class of the plugin.
 * 
 * Contains methods to run other methods on server start and stop.
 */
public final class CapstoneProject extends JavaPlugin {


    /**
     * Initializes important information when the server opens
     * 
     * Creates the listener, settings, and loads the database when the server
     * opens.
     */
    @Override
    public void onEnable() {
        getServer().getPluginManager().registerEvents(new EntityListener(), this);
        CapstoneProjectSettings.getInstance().load();
        Database.getInstance().load();


    }

    public static CapstoneProject getInstance() {
        return getPlugin(CapstoneProject.class);

    }

    /**
     * Runs when the server is turned off
     * 
     * Disconnects safely from the database once the server is closing down.
     */
    @Override
    public void onDisable() {
        Database.getInstance().close();
    }
}
