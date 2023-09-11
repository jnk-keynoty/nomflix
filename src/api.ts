const API_KEY = "07f18c229fdd23b7c25f8f8006bd8484";
const BASE_PATH ="https://api.themoviedb.org/3";
export interface IMovies {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}
export interface IDetails {
	id: number;
	backdrop_path: string;
	poster_path: string;
	genres: [{name:string}];
	homepage: string;
	title: string;
	release_date: string;
	overview: string;
	spoken_languages: {
		name: string;
	};
	vote_average: number;
}
export interface ITv {
	id: number;
	backdrop_path: string;
	poster_path: string;
	name: string;
	overview: string;
}
export interface ITvDetails {
	id: number;
	backdrop_path: string;
	poster_path: string;
	genres: [{name:string}];
	homepage: string;
	name: string;
	release_date: string;
	overview: string;
	spoken_languages: {
		name: string;
	};
	vote_average: number;
}
export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovies[];
	total_pages: number;
	total_results: number;
}
export interface IGetTvResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: ITv[];
	total_pages: number;
	total_results: number;
}

export function getMovies(){
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}

export function getPopular(){
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}
export function getTopRated(){
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}
export function getUpcoming(){
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}

export function getOnTheAir(){
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}

export function getAiringToday(){
	return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}
export function getPopularTv(){
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}
export function getTopRatedTv(){
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}

export function getMovieDetails(movieId:string){
	return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}
export function getTvDetails(seriesId:string){
	return fetch(`${BASE_PATH}/tv/${seriesId}?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
		response => response.json()
	)
}

export function searchMovies(keyword:string){
	return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=en-US&page=1`).then(
		response => response.json()
	)
}
export function searchTv(keyword:string){
	return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=en-US&page=1`).then(
		response => response.json()
	)
}
