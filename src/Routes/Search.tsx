import { useLocation } from 'react-router-dom';
import SearchMoviesSlider from '../Components/SerchMoviesSlider';
import SearchTvSlider from '../Components/SearchTvSlider';
import { styled } from 'styled-components';

const Heading = styled.h1`
  font-size: 48px;
  font-weight: 600;
  padding: 100px 30px 0;
`;

function Search() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const keyword = urlParams.get('keyword');

  return (
    <>
      <Heading>Search Result</Heading>
      <SearchMoviesSlider keyword={keyword || ''} />
      <SearchTvSlider keyword={keyword || ''} />
    </>
  );
}
export default Search;
