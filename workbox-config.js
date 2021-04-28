module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,png,jpg,html,json,txt,js,gif}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};