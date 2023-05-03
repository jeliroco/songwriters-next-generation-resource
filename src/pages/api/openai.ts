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
    const prompt = `Write me an ${adjective} song about ${topic}, in the style of ${style}. 

    Create the song by combining the styles of the following artists:
    The Beatles; 
    Queen; 
    Kendrick Lamar; 
    Elton John; 
    Taylor Swift; 
    Edgar Allan Poe; 
    Robert Frost; 
    Nirvana. 
    
    Analyze the lyrics and musical characteristics of each artist 
    and use this information to develop a cohesive and original piece 
    of work. Your AI-generated song should incorporate elements of each 
    artist's signature style, including their tone, theme, lyrical 
    structure, and musical elements. Be sure to seamlessly integrate 
    these elements to create a song that is both familiar and new. 
    Your song should appeal to fans of each artist, while also standing 
    out as a unique and innovative piece of work. 

    Do not suggest keys, chords, or time signaures.
    Absolutely do not use the names of any of the artists in the list.
    `;

    // Propose a key and a time signature for the whole song.
    // For each section, propose a chord progression. The progression can be different for each section.

    // The structure of the song should be:
    // - Verse 1 (8 lines)
    // - Pre-Chorus (2 lines)
    // - Chorus (4 lines)
    // - Bridge
    // - Verse 2 (8 lines)
    // - Pre-Chorus (2 lines)
    // - Chorus (4 lines)
    // - Breakdown
    // - Outro
    try {
      // const completion = await openai.createChatCompletion({
      //   model: "gpt-4",
      //   messages: [{ role: "user", content: prompt }],
      //   temperature: 0.9,
      //   max_tokens: 500,
      // });
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.9,
        max_tokens: 1000,
      });
      return new Response(JSON.stringify(completion.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      if (error.response) {
        return new Response(null, {
          status: error.response.status,
        });
      } else {
        return new Response(null, {
          status: 500,
        });
      }
    }
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
