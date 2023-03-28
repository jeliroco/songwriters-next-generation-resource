import type { APIRoute } from "astro";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-5fAzexFce62JVb72nbZCzT9U",
  apiKey: import.meta.env.OPENAI_API_KEY,
});

// Outputs: /builtwith.json
export const post: APIRoute = async function post({ params, request }) {
  const openai = new OpenAIApi(configuration);

  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const adjective = body.adjective ?? "random";
    const topic = body.topic ?? "music";
    const style = body.style ?? "rock";
    const prompt = `Write me an ${adjective} song about ${topic}, in the style of ${style}.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 4000,
    });
    return {
      body: JSON.stringify(response.data),
    };
  } else {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Write me some random song lyrics about laziness",
      temperature: 0.9,
      max_tokens: 2048,
    });
    return {
      body: JSON.stringify(response.data),
    };
  }
};
