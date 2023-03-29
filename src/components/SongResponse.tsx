import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import Heading from "./Heading";
const configuration = new Configuration({
  organization: "org-5fAzexFce62JVb72nbZCzT9U",
  apiKey: import.meta.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface SongResponseProps {}

const SongResponse: React.FC<SongResponseProps> = ({}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [lyrics, setLyrics] = useState("");

  const [adjectiveInput, setAdjectiveInput] = useState("random");
  const [topicInput, setTopicInput] = useState("music");
  const [styleInput, setStyleInput] = useState("rock");

  async function getOpenaiResponse() {
    setIsWriting(true);
    setIsReady(false);
    const request: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adjective: adjectiveInput,
        topic: topicInput,
        style: styleInput,
      }),
    };
    const data = await fetch("/openai.json", request).then((response) =>
      response.json()
    );
    setLyrics(
      data?.choices[0]?.text?.trim() ?? "There was an error. Please try again."
    );
    setIsReady(true);
    //console.log(data?.choices[0]?.text);
  }

  const handleSubmit = () => {
    getOpenaiResponse();
  };

  return (
    <div>
      <form
        className="text-sm md:text-base flex flex-col gap-2 p-2 m-2 border-2 bg-white/50 border-orange-200 rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Heading>Lyrical Inspiration Generator</Heading>
        <p className="max-w-prose m-auto text-center">
          Input any adjectives, topics, and styles that you want your song to be
          based on. This will guide the AI in generating lyrics that are
          personalized for you.
        </p>
        <p className="max-w-prose m-auto text-center">
          When you're ready, click the button below to generate your lyrics.
        </p>
        <label className="flex flex-col md:flex-row gap-2 items-center text-center md:text-right justify-center">
          <div className="w-24 font-bold">Adjectives</div>
          <input
            className="flex-1 p-1 border-2 rounded-md"
            type="text"
            placeholder="random"
            onChange={(e) => setAdjectiveInput(e.target.value)}
          />
        </label>
        <label className="flex flex-col md:flex-row gap-2 items-center text-center md:text-right justify-center">
          <div className="w-24 font-bold">Topic</div>
          <input
            className="flex-1 p-1 border-2 rounded-md"
            type="text"
            placeholder="music"
            onChange={(e) => setTopicInput(e.target.value)}
          />
        </label>
        <label className="flex flex-col md:flex-row gap-2 items-center text-center md:text-right justify-center">
          <div className="w-24 font-bold">Style</div>
          <input
            className="flex-1 p-1 border-2 rounded-md"
            type="text"
            placeholder="rock"
            onChange={(e) => setStyleInput(e.target.value)}
          />
        </label>
        <div className="text-xs md:text-base text-center my-4 leading-10">
          Write me a{" "}
          <span className="bg-blue-100 border-2 border-blue-200 p-1 rounded-lg text-blue-500">
            {adjectiveInput ?? "random"}
          </span>{" "}
          song about{" "}
          <span className="bg-blue-100 border-2 border-blue-200 p-1 rounded-lg text-blue-500">
            {topicInput ?? "music"}
          </span>{" "}
          in the style of{" "}
          <span className="bg-blue-100 border-2 border-blue-200 p-1 rounded-lg text-blue-500">
            {styleInput ?? "rock"}
          </span>
          .
        </div>
        <input
          className="m-auto cursor-pointer px-4 py-2 text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded md:text-base hover:bg-blue-600 focus:bg-blue-700 hover:border-blue-700 focus:border-blue-800"
          type="submit"
          value="Write me a song!"
        />
      </form>
      {isWriting && (
        <div className="text-sm md:text-base max-w-prose rounded-lg m-auto p-2 bg-white/50">
          <p className="whitespace-pre-line">
            {isReady ? lyrics : "Loading... This might take a minute..."}
          </p>
        </div>
      )}
      {!isWriting && <div className="h-24"></div>}
    </div>
  );
};

export default SongResponse;
