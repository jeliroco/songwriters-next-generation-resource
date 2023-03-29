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

    For inspiration, consider the lyrics of the following artists:
    - The Beatles
    - Kendrick Lamar
    - Bob Dylan
    - Elton John
    - Jay-Z
    - Eminem
    - Taylor Swift
    - The Rolling Stones

    Do not use aforementioned names in the lyrics you write.

    Use poetic devices such as:
    - Alliteration
    - Assonance
    - Consonance
    - Metaphor
    - Simile
    - Onomatopoeia
    - Personification
    - Allusion
    - Hyperbole
    - Irony
    - Paradox
    - Symbolism
    - Synecdoche
    - Understatement
    - Apostrophe
    - Euphemism
    - Imagery
    - Metonymy

    Do not use aforementioned words in the lyrics you write.
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
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
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
