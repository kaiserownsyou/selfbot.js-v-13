const fs = require('fs');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        // Only respond to your own messages
        if (message.author.id !== client.user.id) return;

        if (message.content === '.help2') {
            // 1. Read the commands folder
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            
            // 2. Format the list (removing the .js extension for a cleaner look)
            const commandNames = commandFiles.map(file => `> ${file.replace('.js', '')}`);
            
            // 3. Create the "panel" message
            const helpMenu = [
                "**📜 AUTOMATIC COMMAND LIST**",
                "━━━━━━━━━━━━━━━━━━━━",
                commandNames.join('\n'),
                "━━━━━━━━━━━━━━━━━━━━",
                `*Total Commands: ${commandFiles.length}*`
            ].join('\n');

            // 4. Send the message
            message.channel.send(helpMenu);
        }
    });
};
