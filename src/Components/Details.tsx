import { useQuery } from 'react-query';
import { IDetails, getMovieDetails } from '../api';
import { styled } from 'styled-components';
import { makeImagePath } from '../utils';

interface IParams {
  movieId: string;
}

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const LowerPart = styled.div`
  top: -120px;
  position: relative;
  padding: 0 20px;
`;

const Genre = styled.span`
  background-color: rgba(255, 255, 255, 0.8);
  height: 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.black.darker};
  font-size: 12px;
  padding: 4px 8px;
  font-weight: 500;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  margin-top: 8px;
  font-size: 48px;
  font-weight: 600;
`;
const Homepage = styled.a`
  display: block;
  font-size: 12px;
  margin-bottom: 40px;

  &:hover {
    text-decoration: underline;
  }
`;
const SubTitle = styled.h4`
  color: #aeaeae;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.4;
  margin-bottom: 20px;
`;

function Details({ movieId }: IParams) {
  const { data, isLoading } = useQuery<IDetails>(['movie', movieId], () =>
    getMovieDetails(movieId)
  );

  console.log(data);

  return (
    <>
      <BigCover
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
            data?.backdrop_path || '',
            'w500'
          )})`,
        }}
      />
      <LowerPart>
        <div>
          {data?.genres.map((item) => (
            <Genre style={{ marginRight: 10 }}>{item.name}</Genre>
          ))}
        </div>
        <BigTitle>{data?.title}</BigTitle>
        <Homepage href={data?.homepage}>{data?.homepage}</Homepage>
        <SubTitle>Release Date</SubTitle>
        <BigOverview>
          {new Date(data?.release_date || '').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </BigOverview>

        <SubTitle>Overview</SubTitle>
        <BigOverview>{data?.overview}</BigOverview>
      </LowerPart>
    </>
  );
}

export default Details;
