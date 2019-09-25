import {
	selectInterview,
	getInterviewByAllTags,
	getInterviewsByFavoriteTags
} from './cron';

test('Select interview randomly', () => {
	const interviews = new Set([
		'5d25ae1ebc154aaecbc321ff',
		'5d25ae1ebc154aaecbc32206',
		'5d317736b3dc05fc689928d7',
		'5d317736b3dc05fc689928d8',
		'5d317736b3dc05fc689928d9',
		'5d317736b3dc05fc689928da',
		'5d317736b3dc05fc689928db',
		'5d317736b3dc05fc689928dc',
		'5d317736b3dc05fc689928dd',
		'5d317736b3dc05fc689928de',
	])
	const selectedInterview = selectInterview(interviews)
	expect(interviews.has(selectedInterview)).toEqual(true);
});

test('Get interviews in all tags', () => {
	const tagsIncludeInterviews = {
		javascript: new Set([
			'5d25ae1ebc154aaecbc321ff',
			'5d25ae1ebc154aaecbc32206',
			'5d317736b3dc05fc689928d7',
		]),
		js: new Set([
			'5d25ae1ebc154aaecbc321ff',
			'5d25ae1ebc154aaecbc32206',
			'5d317736b3dc05fc689928d7',
		]),
		web: new Set([
			'5d25ae1ebc154aaecbc32202',
			'5d25ae1ebc154aaecbc32204',
			'5d25ae1ebc154aaecbc32205',
			'5d317bc99cc8e1fe74729edd',
		]),
		memory: new Set([
			'5d25ae1ebc154aaecbc32207',
			'5d317a16606792fd9d7579a2',
		]),
		algorithm: new Set([
			'5d25ae1ebc154aaecbc32209'
		])
	};
	const expectedRes = new Set([
		'5d25ae1ebc154aaecbc321ff',
		'5d25ae1ebc154aaecbc32206',
		'5d317736b3dc05fc689928d7',
		'5d25ae1ebc154aaecbc32202',
		'5d25ae1ebc154aaecbc32204',
		'5d25ae1ebc154aaecbc32205',
		'5d317bc99cc8e1fe74729edd',
		'5d25ae1ebc154aaecbc32207',
		'5d317a16606792fd9d7579a2',
		'5d25ae1ebc154aaecbc32209',
	])
	const res = getInterviewByAllTags(tagsIncludeInterviews);
	expect(expectedRes).toEqual(res);
});

test('Get interviews in favorite tags', () => {
	const tagsIncludeInterviews = {
		javascript: new Set([
			'5d25ae1ebc154aaecbc321ff',
			'5d25ae1ebc154aaecbc32206',
			'5d317736b3dc05fc689928d7',
		]),
		js: new Set([
			'5d25ae1ebc154aaecbc321ff',
			'5d25ae1ebc154aaecbc32206',
			'5d317736b3dc05fc689928d7',
		]),
		web: new Set([
			'5d25ae1ebc154aaecbc32202',
			'5d25ae1ebc154aaecbc32204',
			'5d25ae1ebc154aaecbc32205',
			'5d317bc99cc8e1fe74729edd',
		]),
		memory: new Set([
			'5d25ae1ebc154aaecbc32207',
			'5d317a16606792fd9d7579a2',
		]),
		algorithm: new Set([
			'5d25ae1ebc154aaecbc32209'
		])
	};
	const favoriteTags = [ 'javascript', 'js' ];
	const res = getInterviewsByFavoriteTags(tagsIncludeInterviews, favoriteTags);
	const expectedRes = new Set([
		'5d25ae1ebc154aaecbc321ff',
		'5d25ae1ebc154aaecbc32206',
		'5d317736b3dc05fc689928d7',
	]);
	expect(expectedRes).toEqual(res);
});
