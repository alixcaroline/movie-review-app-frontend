import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { commonInputClasses } from '../../utils/theme';

const SearchResults = ({
	visible,
	results = [],
	focusedIndex,
	onSelect,
	resultContainerStyle,
	selectedResultStyle,
	renderItem,
}) => {
	const resultContainer = useRef();

	useEffect(() => {
		resultContainer?.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	}, [focusedIndex]);

	if (!visible) return null;
	return (
		<div className='absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar'>
			{results.map((result, index) => {
				const getSelectedClass = () => {
					return selectedResultStyle
						? selectedResultStyle
						: 'dark:bg-dark-subtle bg-light-subtle';
				};
				return (
					<ResultCard
						ref={index === focusedIndex ? resultContainer : null}
						key={index.toString()}
						item={result}
						renderItem={renderItem}
						resultContainerStyle={resultContainerStyle}
						selectedResultStyle={
							index === focusedIndex ? getSelectedClass() : ''
						}
						onMouseDown={() => onSelect(result)}
					/>
				);
			})}
		</div>
	);
};

const ResultCard = forwardRef((props, ref) => {
	const {
		item,
		renderItem,
		resultContainerStyle,
		selectedResultStyle,
		onMouseDown,
	} = props;

	const getClasses = () => {
		if (resultContainerStyle)
			return resultContainerStyle + ' ' + selectedResultStyle;
		return (
			selectedResultStyle +
			' cursor-pointer, rounded, overflow-hidden dark:hover:dark-subtle hover:bg-light-subtle transition '
		);
	};

	return (
		<div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
			{renderItem(item)}
		</div>
	);
});

const LiveSearch = ({
	results = [],
	selectedResultStyle,
	resultContainerStyle,
	value = '',
	placeholder = '',
	renderItem = null,
	onChange = null,
	onSelect = null,
	inputStyle,
	name,
}) => {
	const [displaySearch, setDisplaySearch] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [defaultValue, setDefaultValue] = useState('');

	const handleOnFocus = () => {
		if (results.length) setDisplaySearch(true);
	};
	const closeSearch = () => {
		setDisplaySearch(false);
		setFocusedIndex(-1);
	};

	const handleOnBlur = () => {
		setTimeout(() => {
			closeSearch();
		}, 100);
	};

	const handleSelection = (selectedItem) => {
		if (selectedItem) {
			onSelect(selectedItem);
			closeSearch();
		}
	};

	const handleKeyDown = ({ key }) => {
		let nextCount;
		const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
		if (!keys.includes(key)) return;

		if (key === 'ArrowDown') {
			//when focused on the last one and pressing down arrow, focus on first item
			nextCount = (focusedIndex + 1) % results.length;
		}

		if (key === 'ArrowUp') {
			//when focused on the first one and pressing up arrow focus on last item
			nextCount = (focusedIndex + results.length - 1) % results.length;
		}

		if (key === 'Enter') return handleSelection(results[focusedIndex]);

		if (key === 'Escape') return closeSearch();

		setFocusedIndex(nextCount);
	};

	const getInputStyle = () => {
		return inputStyle
			? inputStyle
			: commonInputClasses + ' rounded border-2 p-1 text-lg';
	};

	const handleChange = (e) => {
		setDefaultValue(e.target.value);
		onChange && onChange(e);
	};

	useEffect(() => {
		if (value) setDefaultValue(value);
	}, [value]);

	return (
		<div className='relative'>
			<input
				type='text'
				id={name}
				name={name}
				className={getInputStyle()}
				placeholder={placeholder}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				value={defaultValue}
				onChange={handleChange}
			/>
			<SearchResults
				focusedIndex={focusedIndex}
				visible={displaySearch}
				results={results}
				onSelect={handleSelection}
				renderItem={renderItem}
				resultContainerStyle={resultContainerStyle}
				selectedResultStyle={selectedResultStyle}
			/>
		</div>
	);
};

export default LiveSearch;
