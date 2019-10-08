const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './src/index.js'),
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{ test: /\.(bmp|gif|jpg|jpeg|png)$/, use: ['url-loader?limit=8192&name=[hash: 8]-[name].[ext]'] },
			{ test: /\.(eot|svg|ttf|woff|woff2)$/, use: ['url-loader'] },
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.vue$/, use: 'vue-loader' }
		]
	},
	resolve: {	// alias 应该是 json 对象，不能使用单引号
		alias: {
			"vue$": "vue/dist/vue.js"
		}
	}
};