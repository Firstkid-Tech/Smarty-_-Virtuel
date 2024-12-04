const { Client } = require('whatsapp-web.js');
function handlePairing(client, message) {
    const { from } = message;
    client.sendMessage(from, 'Pairing request received!');
}

module.exports = {
    handlePairing
};
