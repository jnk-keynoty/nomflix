import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { styled } from 'styled-components';
import { IGetTvResult, searchTv } from '../api';
import { useState } from 'react';
import { makeImagePath } from '../utils';
import TvDetails from './TvDetails';
const Slider = styled.div`
  position: relative;
  padding-top: 50px;
  padding-bottom: 200px;
  margin-bottom: 50px;
  overflow: hidden;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
  padding: 0 30px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 68px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  max-height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 9999;
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 36px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;

  color: ${(props) => props.theme.white.lighter};
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 36px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.white.lighter};
  background-color: transparent;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      duration: 0.3,
      delay: 0.5,
      type: 'tween',
    },
  },
};
const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
      delay: 0.5,
      type: 'tween',
    },
  },
};

const offset = 6;

interface IParams {
  keyword: string;
}

function SearchTvSlider({ keyword }: IParams) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string; category: string }>(
    '/search/:movieId/:category'
  );
  const { data, isLoading } = useQuery<IGetTvResult>(
    ['searchTV', keyword],
    () => searchTv(keyword)
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    history.push(`/search/${movieId}/Tv?keyword=${keyword}`);
  };
  const onOverlayClick = () => history.push(`/search?keyword=${keyword}`);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <>
      <Slider>
        <SliderHeader>
          <Title>TV Series ({data?.results.length})</Title>
          <Button type='button' onClick={increaseIndex}>
            ⟩
          </Button>
        </SliderHeader>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  whileHover='hover'
                  initial='normal'
                  variants={boxVariants}
                  transition={{ type: 'tween' }}
                  bgPhoto={makeImagePath(movie?.backdrop_path, 'w500')}
                  onClick={() => onBoxClick(movie.id)}
                  layoutId={movie.id + ''}
                >
                  <Info variants={InfoVariants}>
                    <h4>{movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {bigMovieMatch?.params.category === 'Tv' ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie layoutId={bigMovieMatch.params.movieId}>
              {clickedMovie && (
                <>
                  <TvDetails movieId={bigMovieMatch.params.movieId} />
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
export default SearchTvSlider;
