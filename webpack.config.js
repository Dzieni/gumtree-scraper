var path = require('path')
var webpack = require('webpack')

module.exports = {
	target: 'node',
	mode: 'development',
	entry: ['@babel/polyfill', './src/index.js'],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true,
					},
				},
			},
			{
				test: /\.ya?ml$/,
				use: ['js-yaml-loader'],
			},
		],
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/'),
			'@config': path.resolve(__dirname, 'config/'),
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			TMP_DIR: JSON.stringify(path.resolve(__dirname, 'tmp/')),
			ID_CACHE_PATH: JSON.stringify(path.resolve(__dirname, 'id-cache')),
		}),
	],
}
