# LifeServerLogger

This repo contains everything you would need to start your own Minecraft Life 
server history log. It includes a website, a Spring app, and a plugin that runs 
on one device to make self-hosting simple. Do note that there are security risks 
that come from hosting your own servers and opening ports. If you have not 
hosted a server before, DO NOT TRY THIS. I aimed for simplicity and security,
but nothing is perfectly secure.

While this project is my CSCI Capstone Project, I hope to continue developing 
and maintaining it for a while after.

## Requirements

[H2](https://www.h2database.com/html/download.html) - Currently the database 
used by the project. Make sure to know how to run it and set up a good username and password for the server to use. 

[Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - 
Used to run the website server.

[IntelliJ](https://www.jetbrains.com/idea/download/?section=windows) - Used to
start the Spring app

Port 5173, 8080, and 25565 forwarded. Alternatively, use a tunnel service like 
Cloudflare Tunnels. I have not experimented with it before, though, so I am not 
sure how to set it up, but it should be more secure.

## Installation

Download the Life Server Logger folder and put it near your server for easy 
access.

Go into LifeServerLogSite and change the .env file to your public IP. This will
change your website's IP to the correct value.

Go into Spring-Boot/deathlogger/src/main/resources/application.properties and 
change the spring.datasource.username and spring.datasource.password values to 
the username and password you set up for H2. They are currently set to the
default admin values. It will still work if you didn't add anything. It does
leave you more vulnerable though.

Go back to /main and go through /java to get to ServerIP and update it with your 
public IP. This allows for communication between your website and your database.

Finally, go into CapstoneProject/target to copy the CapstoneProject-1.0.0.jar to
use for your Spigot Minecraft server. If you haven't made a spigot server before,
go to [SpigotMC](https://www.spigotmc.org/wiki/spigot-installation/) and use 
BuildTools to create the server. Once the server is created, place the plugin in
the plugins folder.

## Starting the servers

First start your H2 server. If not sure how, after installation, in the created 
folders bin run the h2 file according to your device.

Next open the Spring-Boot folder in IntelliJ and run the 
DeathloggerApplication.java file.

After that, you can open a command window, go to the LifeServerLogSite 
directory and use

```bash
npm run dev
```
Finally, start your spigot server and you are good to go!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)