const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');

// --- CONFIG ---
const prefix = '.';
// Add your 6 tokens here. If you have fewer, just leave the others empty or delete them.
const TOKENS = [
    '',
    '',
    '',
    '',
    '',
    ''
]; 

// Filter out empty strings or "TOKEN_X" placeholders so it only runs real tokens
const activeTokens = TOKENS.filter(t => t && !t.startsWith('TOKEN_'));

if (activeTokens.length === 0) {
    console.log("❌ ERROR: No valid tokens found in the list!");
    process.exit();
}

console.log(`🚀 Starting script with ${activeTokens.length} account(s)...`);

const startBot = (token, accountNum) => {
    const client = new Client();

    client.on('ready', async () => {
        console.log(`--- [Acc ${accountNum}] ✅ Online: ${client.user.tag} ---`);

        // Load commands from the folder
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            try {
                // Ensure each client gets a fresh instance of the command logic
                delete require.cache[require.resolve(`./commands/${file}`)];
                const commandModule = require(`./commands/${file}`);
                
                // Pass both client AND account number if your command needs to know which bot is talking
                commandModule(client, accountNum); 
            } catch (error) {
                console.log(`❌ [Acc ${accountNum}] Failed to load ${file}: ${error}`);
            }
        }
    });

    client.login(token).catch(err => {
        console.error(`❌ [Acc ${accountNum}] LOGIN FAILED: ${err.message}`);
    });
};

// --- BOOT UP ---
activeTokens.forEach((token, index) => {
    // Adding a slight delay (2 seconds) between logins to prevent Discord from flagging the IP
    setTimeout(() => {
        startBot(token, index + 1);
    }, index * 2000); 
});

process.on('uncaughtException', (err) => {
    console.log('⚠️ CRITICAL ERROR (Caught to prevent crash):', err.message);
});
