const Encore = require('@symfony/webpack-encore');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const argv = require('yargs').argv;
const env = argv.env || {};
const context = require('@symfony/webpack-encore/lib/context');

let srcPath = './src';
if ('srcPath' in env) {
    srcPath = env.srcPath;
}

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    // Simplify manifest key
    .setManifestKeyPrefix('')

    // will create public/build/app.js and public/build/app.css
    .addEntry('assets/scripts/app', srcPath + '/assets/scripts/app.js')
    .addStyleEntry('assets/styles/app', srcPath + '/assets/styles/app.scss')

    // put images and fonts in the assets subdirectory
    .configureFilenames({
        images: Encore.isProduction() ? 'assets/images/[name].[hash:8].[ext]' : 'assets/images/[name].[ext]',
        fonts: Encore.isProduction() ? 'assets/fonts/[name].[hash:8].[ext]' : 'assets/fonts/[name].[ext]',
    })

    // allow sass/scss files to be processed
    .enableSassLoader(function(sassOptions) {
        sassOptions.precision = 10;
    })

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    // allow using external jQuery
    .addExternals({jquery: 'jQuery'})

    // output source maps
    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    .enableBuildNotifications(!Encore.isProduction())

    // create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // Add HTML loader
    .addLoader({
        test: /\.html$/,
        use: [
            { loader: 'html-loader' },
            {
                loader: 'posthtml-loader',
                options: {
                    plugins: [
                        require('posthtml-extend')({
                            root: srcPath + '/layouts'
                        }),
                        require('posthtml-include')({
                            root: srcPath + '/partials'
                        })
                    ]
                }
            }
        ]
    })

    // Copy files...
    .addPlugin(new CopyWebpackPlugin([
        // jquery
        {
            from: 'node_modules/jquery/dist/jquery' + (Encore.isProduction() ? '.min' : '') + '.js',
            to: './assets/vendor/jquery.js'
        },
        // vendor assets
        { from: srcPath + '/assets/vendor', to: './assets/vendor' },
    ]))
;

// Add entry points for all html files in the root of src
glob.sync(srcPath + '/*.html').forEach((file) => {
    Encore.addPlugin(new HtmlWebpackPlugin({
        template: file,
        filename: file.split('/').pop(),
    }))
});

// Override output path from command line
if ('outputPath' in env) {
    Encore.setOutputPath(argv.env.outputPath);
}

// Override public path from command line
if ('publicPath' in env) {
    Encore.setPublicPath(argv.env.publicPath);
} else if (context.runtimeConfig.useDevServer) {
    Encore.setPublicPath('/');
}

let config = Encore.getWebpackConfig();

//console.log(config.devServer);
config.devServer.watchOptions.poll = true;

// export the final configuration
module.exports = config;