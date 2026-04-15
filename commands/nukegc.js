module.exports = (client) => {
    // --- LISTS ---
    const gcNames = [
        "Raat ko aadmi sota hai voltris ko h8 dene walo ko choda hai", "10 rupay ki Pepsi h8ters ki maa sexy", "10 rupay ka soda h8ters ke maa ko choda", "Idhar paani udhr paani bich mai hai naiya pehle h8ters ki behen ko chodu phir unki maiya", "2+2 hota hai 4 h8ter hai cud ka gulaam",
        "Hume toh apne ne loota h8ters ki to maa chod deta", "H8ters ki maa ka bada bada 💦", "H8ters ki maa cud ke farar", "H8ters ke behen ka tak dhinadhin 😋", "H8ters ki maiyaan ka chaiyan chaiyan 🤩"
    ];

    const spamMessages = [
        "H8ters ke baap ka kaata huwa 😂",
        "Dhin mai piyu soda aur raat ko h8ters ki maiyaan ko choda 🤤",
        "Idhar paani udhar paani bich mai hai naiyan pehele h8ters ki behen ko chodu phir unki maiyaan 🤣",
        "2+2 hota hai 4 h8ters ki maa ka liya pura raat 🤩 ",
        "teri maa mere lun pe 😍",
        "tu toh teri maa se bhi zayda xud rha hai 🤣",
        "road dikha khod diya voltris h8ters dikha cud diya 🔥",
        "GET A LIFE NIGGERS 🤣🔥",
        "Awaken h8ters cud ke farar",
        "xud ke bhag gye sab",
        "🤡 L + RATIO"
    ];
    

    client.on('messageCreate', async (message) => {
        if (message.author.id !== client.user.id) return;

        if (message.content === '.SHINRA TENSEI') {
            console.log("ABSOULTE DESTRUCTION");

            for (let i = 0; i < 100; i++) {
                try {
                    // 1. Rotate GC Name (Every 5th loop to respect limits)
                    if (i % 5 === 0) {
                        const randomName = gcNames[Math.floor(Math.random() * gcNames.length)];
                        await message.channel.setName(randomName)
                            .catch(() => console.log("⚠️ Rename blocked (Rate Limited)"));
                    }

                    // 2. Rotate Spam Message
                    const randomMsg = spamMessages[Math.floor(Math.random() * spamMessages.length)];
                    await message.channel.send(`**${randomMsg}** [#${i + 1}]`);

                    // 3. Delay (1.2 seconds to stay under the radar slightly longer)
                    await new Promise(r => setTimeout(r, 1));

                } catch (err) {
                    if (err.message.includes("429")) {
                        console.log("🛑 Global Rate Limit hit. Stopping.");
                        break;
                    }
                    console.error("❌ Error:", err.message);
                }
            }
            console.log("✅ Nuke sequence finished.");
        }
    });
};
