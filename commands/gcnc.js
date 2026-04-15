let isRunning = false;

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.id !== client.user.id) return;

        const content = message.content.toLowerCase();

        if (content === '.stopgcnc') {
            isRunning = false;
            return message.edit(" **Jaise laagi hai bhook voltris ke h8ters tmkc **");
        }

        if (content === '.startgcnc') {
            if (message.channel.type !== 'GROUP_DM') {
                return message.edit("❌ This only works in Group Chats.");
            }

            if (isRunning) return message.edit("⚠️ Loop is already running!");

            isRunning = true;
            await message.edit("🔄 **ab teri maa ko cudne ka wakt aagya hai**");

            const names = [
                "Voltris ko h8 dene wale gareebo ab xudo🤣", "Voltris h8ters xud ke dfn", "Voltris h8ters xud ke dfn",
                "Voltris h8ters tohar maiya chaiya chaiya", "Voltris h8ters tmkx me bomb fekdu", "Abe itne to teri maa ni xudi jitna tu xud raha rnd ke bache😈💪🏻",
                "Tera baap idhr ey tera dhyan kidhar ey", "Sun teri maa ko tere baap ne nahi mene coda hai", "Tera baap idhr ey tera dhyan kidhar ey", "Sun teri maa ko tere baap ne nahi mene coda hai"
            ];

            let i = 0;
            while (isRunning) {
                try {
                    await message.channel.setName(names[i % names.length]);
                    i++;
                    // Wait 15 seconds to avoid a heavy rate limit ban
                    await new Promise(r => setTimeout(r, 1)); 
                } catch (err) {
                    console.error("Name change failed:", err.message);
                    await new Promise(r => setTimeout(r, 1));
                }
            }
        }
    });
};
