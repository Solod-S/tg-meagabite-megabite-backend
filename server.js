const dotenv = require("dotenv");
const shortid = require("shortid");

const { addRow } = require("./utils/googleSheets");
const { format } = require("date-fns");

dotenv.config();
const { WEB_APP_URL } = process.env;

const { bot } = require("./app");

bot.setMyCommands([
  { command: "/faq", description: "Питання, що часто задаються" },
  { command: "/contacts", description: "Контакти" },
  { command: "/hotline", description: "Гаряча лінія" },
  { command: "/megaapp", description: "Про нас" },
]);

bot.on("message", async (msg) => {
  // слушатель событий сообщения
  const chatId = msg.chat.id;
  const text = msg.text;
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd.MM.yyyy");
  const formattedTime = format(currentDate, "HH:mm");

  if (text == "/megaapp") {
    return bot.sendPhoto(chatId, "./img/inline/app.jpg", {
      caption:
        "Давайте розпочнемо 👨‍💻 Натисніть кнопку нижче, щоб ознайомитись з моїм функціоналом!",
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Відкрити меню", web_app: { url: WEB_APP_URL } }],
        ],
      },
    });
  }
  if (text == "/contacts") {
    const stickerUrl = "./img/inline/girl_map.jpg";
    const messageText =
      `.......................................\n` +
      `*Зв'язатиcь з нами:*\n` +
      `.......................................\n` +
      `*Тел:*  044 377 72 87\n` +
      `*Тел:* 067 644 61 71\n` +
      `*Пошта:* info@megabite.ua\n` +
      `.......................................\n` +
      `*Час роботи:*\n` +
      `.......................................\n` +
      `*Пн-Пт:*  9:00 - 18:00\n` +
      `*Сб-Н:* вихідний\n` +
      `.......................................\n` +
      `*Відділ оптових та корпоративних продажів:*\n` +
      `.......................................\n` +
      `*Тел:* 067 244 61 71\n` +
      `*Пошта:* info@megabite.ua\n` +
      `*Прохання:* у листі вказуйте опис Вашої компанії - це, значно, прискорить обробку запиту.\n` +
      `.......................................\n` +
      `*Постачальникам:*\n` +
      `.......................................\n` +
      `*Тел:* 097 944 61 71\n` +
      `*Пошта:* info@megabite.ua\n` +
      `.......................................\n` +
      `*Відділ сервісу:*\n` +
      `.......................................\n` +
      `*Тел:* 098 270 88 75\n` +
      `*Пошта:* pluta@megabite.com.ua\n`;

    return bot.sendPhoto(chatId, stickerUrl, {
      caption: messageText,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Відкрити карту",
              url: "https://goo.gl/maps/jmE55U1KPn1GXXWW9",
            },
          ],
        ],
      },
    });
  }
  if (text == "/hotline") {
    const stickerUrl = "./img/inline/contact2.jpg";
    const messageText = `
    _______________
    .......................................
    <b>Гаряча лінія:</b> 
    .......................................
    <b>Тел:</b> 044 377 72 87
    <b>Тел:</b> 067 644 61 71
    <b>Пошта:</b> info@megabite.ua
    <b>Телеграм:</b> <a href="https://t.me/Megabite_shop">Megabite_shop</a>
    .......................................
    <b>Час роботи:</b> 
    .......................................
    <b>Пн-Пт:</b> 9:00 - 18:00
    <b>Сб-Н:</b> Вихідний
    _______________
  `;

    await bot.sendPhoto(chatId, stickerUrl, {
      caption: messageText,
      parse_mode: "HTML",
    });
  }
  if (text == "/faq") {
    const stickerUrl = "./img/inline/faq1.jpg";
    const messageText = `
    _______________
  .......................................
    <b>Faq:</b>
  .......................................
  
    <a href="https://www.youtube.com/watch?v=qdQBMV_HewE"><b>Як наклеїти захисну плівку на смартфон?</b></a>
    
    <a href="https://www.youtube.com/watch?v=-quEB9pbpsE"><b>Як наклеїти захисне скло на смартфон?</b></a>
    _______________
 
  `;

    await bot.sendPhoto(chatId, stickerUrl, {
      caption: messageText,
      parse_mode: "HTML",
    });
  }
});
