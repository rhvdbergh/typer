const path = require('path');

module.exports = {
	entry: './src/typer.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'typer.bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	watch: true
};
