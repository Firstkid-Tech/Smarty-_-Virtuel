const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');
const { handlePairing } = require('./pair');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const client = new Client();

client.on('qr', qr => {
    console.log('QR Code:', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage('YOUR_PHONE_NUMBER_ID', 'You are connected.');
});

client.on('message', msg => {
    if (msg.body === '!start') {
        msg.reply('Welcome to the WhatsApp session bot!');
    } else if (msg.body === '!pair') {
        handlePairing(client, msg);
    }
});

app.post('/webhook', (req, res) => {
    const { body, from, type } = req.body;
    if (type === 'message') {
        client.sendMessage(from, `You said: ${body}`);
    }
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

client.initialize();
