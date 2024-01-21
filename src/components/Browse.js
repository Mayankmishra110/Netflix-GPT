import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrending from "../hooks/useTrending";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTrending();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
         MainContainer
          - VideoBackground
          - videoTitle
         SecondaryContainer
          - MovieList * n
          - cards * n
  */}
    </div>
  );
};

export default Browse;
