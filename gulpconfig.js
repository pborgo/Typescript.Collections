module.exports = function () {
	var config = {
		paths: {
			build: './build/',
			core: './core/'
		},
		queries: {
			all: '**/*',
			ts: '**/*.ts'
		},
		ts: {
			'noImplicitAny': false,
			'preserveConstEnums': true,
			'removeComments': false,
			'target': "ES5",
			'tempDir': './build/'
		}
	};

	return config;
};