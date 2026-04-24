package org.jababer.capstoneProject.util;

import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class Common {
    private Common() {
    }

    public static void tell(CommandSender sender, String... messages) {
        for (final String message : messages) {
            if (sender instanceof Player) {
                ((Player) sender).spigot().sendMessage(TextComponent.fromLegacy(message));
            } else sender.sendMessage(message);
        }
    }
}
