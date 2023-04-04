const { Configuration, OpenAIApi } = require("openai");
const { env } = require("../utils/env.js");

const model = "gpt-3.5-turbo";
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getChatGptResponse(request) {
  try {
    const response = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: request }],
      stream: false,
    });
    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(`ChatGPT error: ` + err);
    return err;
  }
}

module.exports = { getChatGptResponse };
