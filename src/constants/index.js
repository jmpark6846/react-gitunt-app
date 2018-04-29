
const BASE_URL = 'https://api.github.com/search';
const QUERY_REPOSITORY = '/repositories'
const QUERY_TOPIC = '/topics'
const QUERY_ISFEATURED = '?q=is:featured+is:curated+repositories:>1000';
const QUERY_BY_TOPIC='?q=topic:';
const QUERY_CONDITION='&sort=stars&order=desc';
const QUERY_PAGE =  '&page=';
const QUERY_PP = '&per_page=';
const QUERY_PP_DIGIT = '10';

export { 
	BASE_URL, 
	QUERY_REPOSITORY,
	QUERY_TOPIC,
	QUERY_ISFEATURED,
	QUERY_BY_TOPIC,
	QUERY_CONDITION,
	QUERY_PAGE,
	QUERY_PP,
	QUERY_PP_DIGIT,
}