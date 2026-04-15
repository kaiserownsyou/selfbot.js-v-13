let typingInterval = null;

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        // Only run if YOU sent the message
        if (message.author.id !== client.user.id) return;

        // Command to START spamming
        if (message.content === '.startspam') {
            if (typingInterval) return message.edit("⚠️ Already spamming!");

            const names = [
                "Voltris daddy bolo beta", "Voltris h8ters ro", "Voltris h8ters gulaam", "greeb ke pille daddy max kaho", "greeb ke pille daddy kaiser kaho", 
                "Rnd ke pille papa bolo", "H8TERs tmkx me mera lun", "H8TERs tmkx me sonic", "GET A LIFE NIGGERS", "Gareebo bhago mat🤣"
            ];

            message.edit("tumhari maa ab jor jor se chudegi");

            typingInterval = setInterval(() => {
                // Pick a random name from the list
                const randomName = names[Math.floor(Math.random() * names.length)];
                
                message.channel.send(randomName).catch(err => {
                    console.log("Rate limited or error:", err.message);
                });
            }, 1); // 1.5 seconds delay to avoid instant bans
        }

        // Command to STOP spamming
        if (message.content === '.stopspam') {
            if (typingInterval) {
                clearInterval(typingInterval);
                typingInterval = null;
                message.edit("teri maa ka game over");
            } else {
                message.edit("teri maa bhot hi sayda cudgi");
            }
        }
    });
};
