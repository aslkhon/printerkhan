import dotenv from 'dotenv';
import fs, { unlink } from 'fs';
import https from 'https';
import ptp from 'pdf-to-printer';
import { Telegraf } from 'telegraf';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('text', async (ctx) => console.log(await bot.telegram.getChat(ctx.chat.id)));

bot.on('edited_message', async (ctx) => console.log(ctx.editedMessage));

bot.on('document', async (ctx) => {
  try {

    const file_id = ctx.message.document.file_id;
    const file = fs.createWriteStream(`C:/Users/U2010145/Desktop/printer/assets/${file_id}.pdf`);

    const url = await bot.telegram.getFileLink(file_id);
    
    https.get(url.href, function(responce) {
      responce.pipe(file);
      ptp.print(`assets/${file_id}.pdf`).catch((e) => console.log(e));
    });

    unlink(`assets/${file_id}.pdf`)
  } catch (error) {
    ctx.reply(error);
  }
});

export default bot;