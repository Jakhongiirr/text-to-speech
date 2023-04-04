const { Telegraf } = require("telegraf");
const { env } = require("../utils/env");
const { getChatGptResponse } = require("../apis/gpt.api");
const { translateTo } = require("../apis/google-translate-api");

const token = env.BOT_TOKEN;
const bot = new Telegraf(token);

bot.use(async (ctx, next) => {
  if (!ctx.message || !ctx.message.text) {
    await ctx.reply("men faqat tekst qabul qilaman 🙂");
    return await next();
  }

  const userText = ctx.message.text;
  const englishTranslation = await translateTo("en", userText);
  const chatgptresponse = await getChatGptResponse(englishTranslation);
  const uzbekTranslation = await translateTo("uz", chatgptresponse);
  return await ctx.reply(uzbekTranslation);
});

// long polling
bot
  .launch()
  .then(() => console.log("started"))
  .catch((err) => console.log(err));

module.exports = { bot };
