module.exports = function () {
	var config = {
		files: {

		},
		options: {

		},
		paths: {
			build: './build/',
			collections: './core/collections/',
			core: './core/',
			root: './',
			tests: './tests/'
		},
		queries: {
			all: '**/*.*',
			css: '**/*.css',
			cssSourcemap: '**/*css.map',
			html: '**/*.html',
			js: '**/*.js',
			jsSourcemap: '**/*.js.map',
			less: '**/*.less',
			sourcemap: '**/*.map'
		}
	};

	return config;
};