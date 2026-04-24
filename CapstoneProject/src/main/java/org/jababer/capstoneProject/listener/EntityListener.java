package org.jababer.capstoneProject.listener;

import org.bukkit.Bukkit;
import org.bukkit.GameMode;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.PlayerDeathEvent;
import org.bukkit.scoreboard.Score;
import org.jababer.capstoneProject.CapstoneProject;
import org.jababer.capstoneProject.model.Database;

/**
 * Listener class for entities. 
 */
public final class EntityListener implements Listener {

/**
 * Listener class that listens for players dying
 * 
 * After a player dies, their death data is uploaded to a database
 * 
 * @param event
 */
    @EventHandler
    public void onPlayerDeath(PlayerDeathEvent event) {
        Player player = event.getEntity();
        Score score = event.getEntity().getScoreboard().getObjective("Lives").getScore(player);
        if (score.getScore() > 0) {
            score.setScore(score.getScore() - 1);
        }
        if (score.getScore() == 0) {
            player.setGameMode(GameMode.SPECTATOR);
        }
        Bukkit.getScheduler().runTaskAsynchronously(CapstoneProject.getInstance(), () -> {
            Database.getInstance().saveDeathInfo(event.getDamageSource(), event.getEntity(), event.getDeathMessage());
        });
    }
}
