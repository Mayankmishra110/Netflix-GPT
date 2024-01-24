import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addtrailerVideo } from "../utils/movieSlice";

const useMovietrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      if (json.results && Array.isArray(json.results)) {
        const filterData = json.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addtrailerVideo(trailer));
      } else {
        console.error("json.results is undefined or not an array.");
        // Handle the error or provide a default action
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovietrailer;
