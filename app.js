const TelegramBot = require("node-telegram-bot-api");

const token = "2081069903:AAHMud4SEcCpf2DH-CZXTf9VUTEIS4-QKMo";

const bot = new TelegramBot(token, { polling: true });

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/game", description: "Пройдите капчу" },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const message = msg.message_id;
    const userId = msg.from.id;
    setTimeout(() => {
      return bot.unbanChatMember(chatId, userId);
    }, 180000);
    if (text === "да, мне есть 18!") {
      return bot.sendMessage(
        chatId,
        "Хорошо,я тебя понял. Скажи ты занимаешься трейдингом вместе с нами?)",
        {
          reply_markup: {
            remove_keyboard: true,
            keyboard: [["Да"], ["Нет"]],
          },
        }
      );
    } else if (text === "Нет, мне еще нету 18!") {
      setTimeout(() => {
        return bot.deleteMessage(chatId, message);
      }, 1000);
      return bot.sendMessage(
        chatId,
        "Извини,до новых встреч,когда наступит твое совершеннолетия)",
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );
    }

    if (text === "Да") {
      return bot.sendMessage(chatId, "Отлично,Будем знакомы:)", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    } else if (text === "Нет") {
      return bot.sendMessage(
        chatId,
        `Очень жаль, переходи на наш сайт и начинай трейдить вместе с нами  https://r-invest.fund/`,
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );
    }
    console.log(msg);
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/5a7/cb3/5a7cb3d0-bca6-3459-a3f0-5745d95d54b7/1.webp"
      );
      return bot.sendMessage(
        chatId,
        "Добро пожаловать в телеграм бот!! Выбери команды для общения со мной"
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.last_name} ${msg.from.first_name}, а меня Botik`
      );
    }
    if (text === "/game") {
      return bot.sendMessage(
        chatId,
        `${msg.from.last_name},тебе уже есть 18?`,
        {
          reply_markup: {
            keyboard: [["да, мне есть 18!"], ["Нет, мне еще нету 18!"]],
          },
        }
      );
    }

    return bot.sendMessage(
      chatId,
      "Я только учусь и не понял что ты мне хотел сказать"
    );
  });
};

start();
