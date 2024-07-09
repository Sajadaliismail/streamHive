import React from 'react';
// import PageLayout from '';
import { request } from '../../../Constants/Constants';
import PageComponent from '../HomePage';

export const HomePage = () => {
  const rows = [
    { type: request.fetchNetflixOriginalsTV, name: 'Netflix Originals', isPoster: true },
    { type: request.fetchPopularMovies, name: 'Popular' },
    { type: request.fetchTopRatedMovies, name: 'Top rated' },
    { type: request.fetchNowPlayingMovies, name: 'Now playing' },
  ];

  return <PageComponent topic={'Trending Movies'} contentType={request.fetchTrendingMovie} rows={rows} />;
};

export const Tvshows = () => {
  const rows = [
    { type: request.fetchNetflixOriginalsTV, name: 'Netflix Originals', isPoster: true },
    { type: request.fetchPopularTV, name: 'Popular' },
    { type: request.fetchTopRatedTV, name: 'Top rated' },
    { type: request.fetchTrendingTV, name: 'Trending' },
  ];

  return <PageComponent topic={'Airing Today'} contentType={request.fetchAiringTodayTV} rows={rows} />;
};

export const Movies = () => {
  const rows = [
    { type: request.fetchComedyMovies, name: 'Comedy movies', isPoster: true },
    { type: request.fetchHorrorMovies, name: 'Horror' },
    { type: request.fetchRomanceMovies, name: 'Romance' },
    { type: request.fetchTrendingMovie, name: 'Trending' },
    { type: request.fetchPopularMovies, name: 'Popular' },
    { type: request.fetchTopRatedMovies, name: 'Top rated' },
  ];

  return <PageComponent topic={'Action Movies'} contentType={request.fetchActionMovies} rows={rows} />;
};

export const Popular = () => {
  const rows = [
    { type: request.fetchPopularTV, name: 'Popular Tv', isPoster: true },
    { type: request.fetchNowPlayingMovies, name: 'Now playing' },
  ];

  return <PageComponent topic={'Popular Movies'} contentType={request.fetchPopularMovies} rows={rows} />;
};
