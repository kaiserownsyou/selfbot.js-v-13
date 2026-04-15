let isSpamming = false;

module.exports = (client, accountNum) => {
    client.on('messageCreate', async (message) => {
        // Only listen to YOUR commands
        if (message.author.id !== client.user.id) return;

        const args = message.content.split(' ');
        const command = args[0].toLowerCase();

        // COMMAND: .sayspam <msg>
        if (command === '.sayspam') {
            const spamMessage = args.slice(1).join(' ');
            
            if (!spamMessage) {
                return message.edit('❌ **Usage:** `.sayspam <message>`');
            }

            isSpamming = true;
            console.log(`[Acc ${accountNum}] Started spamming.`);

            // Loop until isSpamming is set to false
            while (isSpamming) {
                try {
                    await message.channel.send(spamMessage);
                    // 1.5 second delay to avoid instant Discord global rate limit
                    await new Promise(resolve => setTimeout(resolve, 1)); 
                } catch (err) {
                    console.error(`[Acc ${accountNum}] Error sending message: ${err.message}`);
                    break; 
                }
            }
        }

        // COMMAND: .stopsayspam
        if (command === '.stopsayspam') {
            isSpamming = false;
            message.edit('🤣 **teri maa ka game over**');
            console.log(`[Acc ${accountNum}] Stopped.`);
        }
    });
};
