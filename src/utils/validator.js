export const validateMovie = (movieInfo) => {
	const {
		title,
		storyLine,
		language,
		releaseDate,
		status,
		type,
		genres,
		tags,
		cast,
	} = movieInfo;

	if (!title.trim()) return { error: 'Title is missing!' };
	if (!storyLine.trim()) return { error: 'Storyline is missing!' };
	if (!language.trim()) return { error: 'Language is missing!' };
	if (!releaseDate.trim()) return { error: 'Release date is missing!' };
	if (!status.trim()) return { error: 'Status is missing!' };
	if (!type.trim()) return { error: 'Type is missing!' };

	//check if genres is an array of strings
	if (!genres.length) return { error: 'Genres are missing' };
	for (let gen of genres) {
		if (!gen.trim()) return { error: 'Invalid genres' };
	}
	//check if tags is an array of strings
	if (!tags.length) return { error: 'Tags are missing' };
	for (let tag of tags) {
		if (!tag.trim()) return { error: 'Invalid tags' };
	}
	//check if cast is an array of objects
	if (!cast.length) return { error: 'Cast and crew are missing' };

	for (let c of cast) {
		if (typeof c !== 'object') return { error: 'Invalid cast' };
	}

	return { error: null };
};
