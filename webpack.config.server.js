const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {server: './server.ts'},
    resolve: {extensions: ['.js', '.ts']},
    target: 'node',
    // this makes sure we include node_modules and other 3rd party libraries
    // (node_modules|main\..*\.js)/,
    externals: [nodeExternals({
        whitelist: [
            /^@angular\/material/,
            /^@ngx-translate\/core/,
            /^@angular/,
            /^@rxjs/
        ]
    })],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    plugins: [
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for "WARNING Critical dependency: the request of a dependency is an expression"
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'),
            {}
        )
    ]
}
