module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        // Only trigger if YOU (the account owner) sent the message
        if (message.author.id !== client.user.id) return;

        // Check for the .help command
        if (message.content === '.help') {
            
            const helpPanel = `
**!𝐕ᴏʟ𝐓ʀɪ𝐒 𝐒ᴇʟғʙᴏᴛ⚔️!**

!Commands! |Prefix- .

[⚡] \`.gcnc\` - Start group chat name loop.
[⚡] \`.stopgcnc\` - Stop group chat name loop.
[💎] \`.watching <status>\` - Set the bot's activity status as "Watching".
[😈] \`.spam <h8ter name>\` - Start Spam.
[👿] \`.stopspam\` - Stops spam.
[✨] \`.say <text>\` - Send message.
[⚔️] \`.dmspam <@user>\` - Start DM spam to user with fixed messages.
[⚠️] \`.servernc <msg>\` - Start Server name loop.

*H8ters xudne ke liye ready ho jao* 🤣

**Credit- BHAGWANJI MAX, DADDY AWAKEN (HEAD), LORD KAISER**

*Ab nikal chutiye* 😂
            `;

            try {
                // Selfbots edit the message to look cleaner
                await message.edit(helpPanel);
            } catch (err) {
                console.error("Error updating panel:", err.message);
            }
        }
    });
};
