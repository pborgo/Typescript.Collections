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
			'declaration': true,
			'noImplicitAny': false,
			'outDir': './build/',
			'preserveConstEnums': true,
			'removeComments': false,
			'sourceMap': true,
			'target': "ES5",
			'tempDir': './build/'
		}
	};

	return config;
};