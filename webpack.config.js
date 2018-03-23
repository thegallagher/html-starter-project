const Encore = require('@symfony/webpack-encore');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    // will create public/build/app.js and public/build/app.css
    .addEntry('assets/scripts/app', './src/assets/scripts/app.js')
    .addStyleEntry('assets/styles/app', './src/assets/styles/app.scss')

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
    .enableBuildNotifications()

    // create hashed filenames (e.g. app.abc123.css)
    .enableVersioning()

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
                            root: './src/layouts'
                        }),
                        require('posthtml-include')({
                            root: './src/partials'
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
        { from: './src/assets/vendor', to: './assets/vendor' },
    ]))
;

// Add entry points for all html files in the root of src
glob.sync('./src/*.html').forEach((file) => {
    Encore.addPlugin(new HtmlWebpackPlugin({
        template: file,
        filename: file.split('/').pop(),
    }))
});

// export the final configuration
module.exports = Encore.getWebpackConfig();