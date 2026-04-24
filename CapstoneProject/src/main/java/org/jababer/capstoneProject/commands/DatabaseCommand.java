package org.jababer.capstoneProject.commands;

import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;
import org.bukkit.entity.Player;
import org.jababer.capstoneProject.model.Database;
import org.jababer.capstoneProject.util.Common;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class DatabaseCommand implements CommandExecutor, TabCompleter {
/**
 * Incomplete basic database access command
 * 
 * Would typically take in a players name and return information about them 
 * from the database. However, it fell out of scope for my project.
 */
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * Executes when the command is run to show information about a player
     * 
     * Takes in a players name and searches a database for instances of them 
     * returned in the order they happened.
     */
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (args.length == 0) {
            Common.tell(sender, "&e=== Database Command ===");
            Common.tell(sender, "&e/db view <player>");

            return true;
        }

        final String param = args[0].toLowerCase();

        if ("view".equals(param)) {
            if (args.length != 2) {
                Common.tell(sender, "&cUsage: /db view <player>");
                return true;
            }

            String playerName = args[1];

            final List<Database.DatabaseMessage> messages = Database.getInstance().getPlayerDeaths(playerName, 20);

            Common.tell(sender, "&e=== Death Log for " + playerName + " (Total deaths: " + messages.size() + ") ===");
            for (Database.DatabaseMessage message : messages) {
                final Timestamp timestamp = message.getTimestamp();
                final String messageText = message.getMessage();
                final String killer = message.getKillerName();
                final int new_lives = message.getVictimNewLives();

                sender.sendMessage("[" + DATE_FORMAT.format(timestamp) + "]: " + messageText + " | New Lives: " + new_lives);
            }


            return true;
        } else {
            Common.tell(sender, "&cInvalid subcommand: Usage: /db view/delete");
            return true;
        }

    }

    /**
     * Supplies the user with tab completion.
     */
    @Override
    public List<String> onTabComplete(CommandSender sender, Command command, String label, String[] args) {
        if (args.length == 1) {
            return Arrays.asList("view").stream()
                    .filter(s -> s.startsWith(args[0].toLowerCase()))
                    .collect(Collectors.toList());
        } else if (args.length == 2 && "view".equals(args[0].toLowerCase())) {
            return Bukkit.getOnlinePlayers().stream()
                    .map(Player::getName)
                    .filter(s -> s.toLowerCase().startsWith(args[1].toLowerCase()))
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }


}
