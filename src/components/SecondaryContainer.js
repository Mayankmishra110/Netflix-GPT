import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black">
      <div>
        {movies.nowPlayingMovies && (
          <div className=" -mt-72 pl-2 relative z-20">
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          </div>
        )}
        {movies.popularMovies && (
          <div>
            <MovieList title={"Popular"} movies={movies.popularMovies} />
          </div>
        )}
        {movies.useTrending && (
          <div>
            <MovieList title={"Top-Rated"} movies={movies.useTrending} />
          </div>
        )}
        {movies.nowPlayingMovies && (
          <div>
            <MovieList title={"Upcoming"} movies={movies.nowPlayingMovies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
