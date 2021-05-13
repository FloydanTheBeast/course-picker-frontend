const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	devtool: "eval",
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "./",
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			components: path.resolve(__dirname, "src/components/"),
			pages: path.resolve(__dirname, "src/pages/"),
			api: path.resolve(__dirname, "src/api/"),
			providers: path.resolve(__dirname, "src/providers/"),
			services: path.resolve(__dirname, "src/services/"),
			icons: path.resolve(__dirname, "assets/icons/"),
			fonts: path.resolve(__dirname, "assets/fonts/")
		}
	},
	devServer: {
		contentBase: "./build",
		historyApiFallback: true,
		port: 8080
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["url-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			favicon: "./assets/icons/favicon.ico"
		})
	]
};
