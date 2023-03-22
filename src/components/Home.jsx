import React from 'react';
import Container from './Container';
import HeroSlideShow from './user/HeroSlideShow';
import NotVerified from './user/NotVerified';
import TopRatedMovies from './user/TopRatedMovies';
import TopRatedTVSeries from './user/TopRatedTVSeries';
import TopRatedWebSeries from './user/TopRatedWebSeries';

const Home = () => {
	return (
		<div className='dark:bg-primary bg-white min-h-screen'>
			<Container className='px-2 xl:p-0'>
				<NotVerified />
				{/* slider */}
				<HeroSlideShow />
				<TopRatedMovies />
				<TopRatedWebSeries />
				<TopRatedTVSeries />
			</Container>
		</div>
	);
};

export default Home;
