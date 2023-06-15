const { clientId, RPC: { details, largeImageKey, smallImageKey, buttons }} = require("./config.json"),
    http = require('http'),
    RPC = new (require('discord-rpc')).Client({ transport: 'ipc'});
var intervalId = 0, reconnectionsSuccess = 0, reconnectionsFail = 0;

function checkInternetConnection() {
    http.get('http://example.com', (res) => {
        reconnectionsSuccess++;
        RPC.emit("ready");
        clearInterval(intervalId);
    }).on('error', (err) => {
        reconnectionsFail++;
        console.clear();
        console.log("[RPC] Waiting to get reconnected...");
    });
  }

async function setActivity() {
    if(!RPC) return;
    RPC.setActivity({
        details,
        startTimestamp: Date.now(),
        largeImageKey,
        largeImageText: "Follow me for more :)",
        smallImageKey,
        smallImageText: "kick.com/thehelltower",
        instance: false,
        buttons
    });
};

RPC.on('ready', () => {
    console.clear();
    console.log(`[RPC] ${RPC.user.username} App connected ! | Re-connections: (Success: ${reconnectionsSuccess} / Fail: ${reconnectionsFail})`); 
    setActivity();

    setInterval(() => {
        setActivity();
    }, 15 * 60 * 1000);
}).on("close", async () => {
    intervalId = setInterval(checkInternetConnection, 10 * 1000);
}).on("error", async () => {
    intervalId = setInterval(checkInternetConnection, 10 * 1000);
});

RPC.login({ clientId }).catch(err => console.error(err));