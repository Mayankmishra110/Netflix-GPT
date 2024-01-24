import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { json } from "react-router-dom";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //Make an API call to GPT
    // const apiKey = "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";

    const gptQuery =
      " Act as a movie recommnedtaion system and suggest some movies for the query : " +
      searchText.current.value +
      " only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Baby ";

    // let retries = 0;
    // const maxRetries = 1;

    // while (retries < maxRetries) {
    // try {
    const gptResults = await openai.chat.completions.create(
      {
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      },
      { headers: { Authorization: `Bearer ${OPENAI_KEY}` } }
    );

    if (!gptResults.choices) {
      // TODO: Write Error Handling}
    }
    console.log(gptResults.choices[0]?.message?.content);

    //Andaz Apna Apna, Hera Pheri, Chupke Chupke, Gadar, Padosan

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");

    //[Andaz Apna Apna, Hera Pheri, Chupke Chupke, Gadar, Padosan]

    //For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    // } catch (error) {
    //   if (error.statusCode === 429 && retries < maxRetries) {
    //     // Retry after a delay, with exponential backoff
    //     const delay = Math.pow(2, retries) * 1000; // 2^retries seconds delay

    //     await new Promise((resolve) => setTimeout(resolve, delay));

    //     retries++;
    //   } else {
    //     // Handle other errors or log the issue
    //     console.error("Error:", error);
    //     break; // Exit the loop if an unrecoverable error occurs
    //   }
    // }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className=" col-span-3 py-2 m-4 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
