let spamming = false;

module.exports = (client, accountNum) => {
    client.on('messageCreate', async (message) => {
        if (message.author.id !== client.user.id) return;

        // --- START GHOST SPAM ---
        if (message.content.startsWith('.startspam2')) {
            const args = message.content.split(' ');
            const spamMessage = args.slice(1).join(' ') || "GHOST DETECTED 👻";
            
            spamming = true;
            await message.edit(`👻 [Acc ${accountNum}] Ghost Spam Active...`);
            setTimeout(() => { if(message.deletable) message.delete().catch(()=>{}) }, 2000);

            const groups = client.channels.cache.filter(c => c.type === 'GROUP_DM');

            while (spamming) {
                // Initial stagger based on account number
                await new Promise(resolve => setTimeout(resolve, accountNum * 600));

                groups.forEach(async (gc) => {
                    if (!spamming) return;
                    try {
                        const sentMsg = await gc.send(spamMessage);
                        
                        // --- GHOST MODE: Delete after 1.5 seconds ---
                        setTimeout(() => {
                            sentMsg.delete().catch(() => {});
                        }, 1500);

                    } catch (err) {
                        if (err.message.includes("429")) {
                            console.log(`⏳ [Acc ${accountNum}] Rate limited in GC: ${gc.id}`);
                        }
                    }
                });

                // Random delay between 2 and 5 seconds for the next round
                const randomWait = Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);
                await new Promise(resolve => setTimeout(resolve, randomWait));
            }
        }

        // --- STOP GHOST SPAM ---
        if (message.content === '.stopspam2') {
            spamming = false;
            await message.edit(`🛑 [Acc ${accountNum}] Cleaning up and stopping...`);
            setTimeout(() => { if(message.deletable) message.delete().catch(()=>{}) }, 2000);
        }
    });
};
