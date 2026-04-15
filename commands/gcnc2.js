let loopActive = {}; // Tracks loop status for each GC separately

module.exports = (client) => {
    const randomNames = [
        "lol", "xd", "lolz",
        "ez", "ez sons", "lol kid",
        "haha lol", "xdx4", "say daddy"
    ];

    client.on('messageCreate', async (message) => {
        if (message.author.id !== client.user.id) return;
        if (message.channel.type !== 'GROUP_DM') return;

        // --- START LOOP COMMAND ---
        if (message.content === '.start2gcnc loop') {
            if (loopActive[message.channel.id]) return message.edit("⚠️ Loop is already running here.");
            
            loopActive[message.channel.id] = true;
            await message.edit("🔄 **GC Name Loop Started!** (Changing every 10s)");
            setTimeout(() => message.delete(), 2000);

            while (loopActive[message.channel.id]) {
                try {
                    let newName = randomNames[Math.floor(Math.random() * randomNames.length)];
                    await message.channel.setName(newName);
                    // Discord rate limits GCs strictly; 10-15 seconds is the safest minimum
                    await new Promise(resolve => setTimeout(resolve, 10000)); 
                } catch (err) {
                    console.error("Rate limited or Error:", err.message);
                    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30s if errored
                }
            }
        }

        // --- STOP LOOP COMMAND ---
        if (message.content === '.stop2gcnc') {
            loopActive[message.channel.id] = false;
            await message.edit("🛑 **GC Name Loop Stopped.**");
            setTimeout(() => message.delete(), 2000);
        }
    });
};
