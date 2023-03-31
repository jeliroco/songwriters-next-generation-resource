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
  const [error, setError] = useState("");
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeOutTime, setTimeOutTime] = useState(0);
  const rateLimitTime = 120;
  let timeoutId: number | undefined;

  const [adjectiveInput, setAdjectiveInput] = useState("random");
  const [topicInput, setTopicInput] = useState("music");
  const [styleInput, setStyleInput] = useState("rock");

  async function getOpenaiResponse() {
    setIsWriting(true);
    setIsReady(false);
    setError("");
    const request: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adjective: adjectiveInput,
        topic: topicInput,
        style: styleInput,
      }),
    };
    await fetch("/openai.json", request)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          let statusText;
          switch (response.status) {
            case 401:
              statusText =
                "Something has gone wrong with our OpenAI API key. Please try again later.";
              break;
            case 403:
              statusText = "Forbidden";
              break;
            case 404:
              statusText = "Not Found";
              break;
            case 429:
              statusText =
                "The OpenAI API is overloaded. Please try again later.";
              break;
            case 500:
              statusText =
                "The OpenAI servers are down. Please try again later.";
              break;
            default:
              statusText = response.statusText;
              break;
          }
          throw new Error(`Error ${response.status}: ${statusText}`);
        }
      })
      .then((data) => {
        setLyrics(
          data?.choices[0]?.text?.trim() ??
            "There was an error. Please try again."
        );
        setIsReady(true);
        setIsWriting(false);
        setIsTimedOut(true);
      })
      .catch((error) => {
        setError(error.message);
        setIsReady(false);
        setIsWriting(false);
        return null;
      });
  }

  useEffect(() => {
    if (isTimedOut) {
      setTimeOutTime(rateLimitTime);
    }
  }, [isTimedOut]);

  useEffect(() => {
    if (timeOutTime !== 0) {
      timeoutId = setTimeout(() => {
        setTimeOutTime((prevSeconds) => prevSeconds - 1);
        if (timeOutTime === 0) {
          setIsTimedOut(false);
          clearTimeout(timeoutId);
        }
      }, 1000);
    }
    else {
      setIsTimedOut(false);
    }
  }, [timeOutTime]);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  const downloadTxtFile = () => {
    const filename = "song.txt";
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(lyrics)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = () => {
    getOpenaiResponse();
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 p-2 m-2 text-sm border-2 border-orange-200 rounded-md md:text-base bg-white/50"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Heading>Lyrical Inspiration Generator</Heading>
        <p className="m-auto text-center max-w-prose">
          Input any adjectives, topics, and styles that you want your song to be
          based on. This will guide the AI in generating lyrics that are
          personalized for you.
        </p>
        <p className="m-auto text-center max-w-prose">
          When you're ready, click the button below to generate your lyrics.
        </p>
        <label className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:text-right">
          <div className="w-24 font-bold">Adjectives</div>
          <input
            className="flex-1 p-1 border-2 rounded-md"
            type="text"
            placeholder="random"
            onChange={(e) => setAdjectiveInput(e.target.value)}
          />
        </label>
        <label className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:text-right">
          <div className="w-24 font-bold">Topic</div>
          <input
            className="flex-1 p-1 border-2 rounded-md"
            type="text"
            placeholder="music"
            onChange={(e) => setTopicInput(e.target.value)}
          />
        </label>
        <label className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:text-right">
          <div className="w-24 font-bold">Style</div>
          <input
            className="flex-1 p-1 border-2 rounded-md"
            type="text"
            placeholder="rock"
            onChange={(e) => setStyleInput(e.target.value)}
          />
        </label>
        <div className="p-4 m-auto my-4 text-xs leading-10 text-center rounded-lg max-w-prose bg-white/50 md:text-base">
          Write me a{" "}
          <span className="p-1 text-blue-500 bg-blue-100 border-2 border-blue-200 rounded-lg">
            {adjectiveInput ?? "random"}
          </span>{" "}
          song about{" "}
          <span className="p-1 text-blue-500 bg-blue-100 border-2 border-blue-200 rounded-lg">
            {topicInput ?? "music"}
          </span>{" "}
          in the style of{" "}
          <span className="p-1 text-blue-500 bg-blue-100 border-2 border-blue-200 rounded-lg">
            {styleInput ?? "rock"}
          </span>
          .
        </div>
        {!isWriting && !isTimedOut && (
          <input
            className="px-4 py-2 w-[200px] m-auto text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded cursor-pointer md:text-base hover:bg-blue-600 focus:bg-blue-700 hover:border-blue-700 focus:border-blue-800"
            type="submit"
            value="Write me a song!"
          />
        )}
        {isWriting && !isTimedOut && (
          <input
            className="px-4 py-2 w-[200px] m-auto text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded opacity-50 cursor-not-allowed md:text-base"
            type="submit"
            disabled
            value="Writing..."
          />
        )}
        {isTimedOut && (
          <input
            className="px-4 py-2 w-[200px] m-auto text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded opacity-50 cursor-not-allowed md:text-base"
            type="submit"
            disabled
            value={`Wait ${timeOutTime} seconds...`}
          />
        )}
      </form>
      {isReady && (
        <div className="p-2 m-auto text-sm rounded-lg md:text-base max-w-prose bg-white/50">
          <div className="flex justify-end">
            <button onClick={downloadTxtFile} className="p-2 text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded cursor-pointer hover:bg-blue-600 focus:bg-blue-700 hover:border-blue-700 focus:border-blue-800">
              Download <i className="bi bi-download"></i>
            </button>
          </div>
          <p className="whitespace-pre-line">{lyrics}</p>
        </div>
      )}
      {error && (
        <div className="max-w-sm p-2 m-auto text-sm text-center rounded-lg md:text-base bg-red-500/50">
          <p className="whitespace-pre-line">{error}</p>
        </div>
      )}
    </div>
  );
};

export default SongResponse;
