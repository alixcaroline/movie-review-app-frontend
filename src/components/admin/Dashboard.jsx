import React from 'react';
import AppInfoBox from '../AppInfoBox';
import LatestUploads from '../LatestUploads';

const Dashboard = () => {
	return (
		<div className='grid grid-cols-3 gap-5 my-5'>
			<AppInfoBox title='Total uploads' subTitle='100' />
			<AppInfoBox title='Total reviews' subTitle='1500' />
			<AppInfoBox title='Total users' subTitle='200' />

			<LatestUploads />
		</div>
	);
};

export default Dashboard;
