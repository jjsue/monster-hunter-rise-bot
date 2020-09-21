require('dotenv').config()
const TeleBot = require('telebot');
const quotesList = require('./bot_quotes');
const bot = new TeleBot({
    token: process.env.BOT_TOKEN, // Required. Telegram Bot API token.
    polling: {
        interval: 1000,
        timeout: 0,
        limit: 100,
        retryTimeout: 5000,
    }
});

const releaseDate = new Date(2021, 2, 26, 1);
bot.on('/start', (msg) => {
    return msg.reply.text("Bienvenido al bot de espera de Monster Hunter Rise, ten en cuenta que este bot ha sido realizado como pequeño tributo de un amante de la saga que no tiene relación alguna con CAPCOM.", { asReply: true });
});

bot.on('/help', (msg) => {
    return msg.reply.text("/time Permite ver cuanto tiempo queda para la salida del juego.\n/quote Te dice alguna frase con la que seguro que te sientes identificado.\nSi quieres mandar alguna cita habla directamente con mi creador @jjsue", { asReply: true });
});

bot.on('/time', (msg) => {
    const nowDate = Date.now();
    const differenceDate = releaseDate - nowDate;
    const days = differenceDate / 1000 / 60 / 60 / 24;
    const hours = differenceDate / 1000 / 60 / 60 % 24;
    return msg.reply.text(`Quedan ${Math.floor(days)} dias y ${Math.floor(hours)} horas para el estreno de Monster hunter Rise`);
});

bot.on('/quote', (msg) => {
    const toReply = quotesList[Math.floor(Math.random() * quotesList.length)];
    return msg.reply.text(toReply, { asReply: true });
});
bot.start();