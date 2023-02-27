import React, { useState } from 'react';
import { searchActor } from '../api/actor';
import { useSearch } from '../hooks';
import { renderItem } from '../utils/helper';
import LiveSearch from './admin/LiveSearch';

const WritersSelector = ({ onSelect }) => {
	const [value, setValue] = useState('');
	const [profiles, setProfiles] = useState([]);

	const { handleSearch, resetSearch } = useSearch();

	const handleOnChange = ({ target }) => {
		const { value } = target;
		setValue(value);
		handleSearch(searchActor, value, setProfiles);
	};

	const handleOnSelect = (profile) => {
		setValue('');
		onSelect(profile);
		setProfiles([]);
		resetSearch();
	};

	return (
		<LiveSearch
			name='writers'
			value={value}
			placeholder='Search profile'
			results={profiles}
			renderItem={renderItem}
			onSelect={handleOnSelect}
			onChange={handleOnChange}
		/>
	);
};

export default WritersSelector;
