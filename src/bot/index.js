import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import ptp from 'pdf-to-printer';
import { Telegraf, Telegram } from 'telegraf';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('text', async (ctx) => ctx.reply('🖕'));

bot.on('document', (ctx) => {
  const file_id = ctx.message.document.file_id;
  const file = fs.createWriteStream(`C:/Users/U2010145/Desktop/printer/assets/${file_id}.pdf`);

  bot.telegram.getFileLink(file_id).then(url => {
    https.get(url.href, function(responce) {
      responce.pipe(file);
      ptp.print(`assets/${file_id}.pdf`).then(console.log).catch(console.error);
    });
  });
});

export default bot;