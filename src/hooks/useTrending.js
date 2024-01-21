import { useDispatch } from "react-redux";
import { addTrending } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTrending = () => {
  const dispatch = useDispatch();

  // Fetch data from TMDB API and update store

  const getTrending = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrending(json.results));
  };

  useEffect(() => {
    getTrending();
  }, []);
};

export default useTrending;
