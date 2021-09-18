import bot from './bot';

bot.launch()
  .then(() => {
    console.log('Printer bot started ... ');
  })
  .catch((error) => {
    console.log(error);
  });

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))