import { useQuery } from 'react-query';
import {
  IGetTvResult,
  getMovies,
  getOnTheAir,
  getPopular,
  getTopRated,
  getUpcoming,
} from '../api';
import { styled } from 'styled-components';
import { makeImagePath } from '../utils';
import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import OnTheAirSlider from '../Components/OnTheAirSlider';
import AiringTodaySlider from '../Components/AiringTodaySlider';
import PopularTvSlider from '../Components/PopularTvSlider';
import TopRatedTvSlider from '../Components/TopRatedTvSlider';

const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 10px;
  font-weight: 600;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const offset = 6;

function Tv() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  const { data, isLoading } = useQuery<IGetTvResult>(
    ['tv', 'onTheAir'],
    getOnTheAir
  );
  console.log(data);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      console.log(maxIndex);
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push('/');
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <OnTheAirSlider />
          <AiringTodaySlider />
          <PopularTvSlider />
          <TopRatedTvSlider />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
