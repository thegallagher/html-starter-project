# HTML starter project

## Getting started

If you don't have [yarn](https://yarnpkg.com/en/docs/install) or [git](https://git-scm.com/downloads)
installed, you'll need to install them before continuing.

You'll just need to clone this repository. If you are starting a new project, use

    git clone https://github.com/thegallagher/html-starter-project.git
    
Finally, change to the project directory, install the required packages and build the project

    yarn install && yarn run encore dev
    
## Building

To build your website, run:

    yarn run encore [dev|production] # dev for development, production on for production

By default the public path is `/build` for development and `/` for production.
If you need to change the public path, you can use the `--env.publicPath` parameter. eg:

    yarn run encore dev --env.publicPath=/project-name/build
    
Additionally, you can change the output path with the `--env.publicPath` parameter. eg:

    yarn run encore production --env.outputPath=/var/www/sites/mysite.com
    
## Watch

To automatically recompile your assets when they change:

    yarn run encore dev --watch
    
## Dev server

Start dev server. Default link is http://localhost:8080/

For more options, see: https://symfony.com/doc/master/frontend/encore/dev-server.html

    yarn run encore dev-server

## Included packages

### Webpack Encore

Documentation: https://symfony.com/doc/master/frontend.html

Webpack Encore is a simpler way to integrate Webpack into your application.
It wraps Webpack, giving you a clean & powerful API for bundling JavaScript modules,
pre-processing CSS & JS and compiling and minifying assets.

To build assets, run:

    yarn run encore dev


### PostHTML "Extend" and "Include" plugins

Documentation:  
https://github.com/posthtml/posthtml-extend  
https://github.com/posthtml/posthtml-include

These two packages allow some structure and reuse in your HTML code.

The **"Extend"** plugin allows you to create templates or "layouts" for your HTML.
Layouts live in the `src/layouts/` directory.

See `src/index.html` and `src/layouts/app.html` for more examples on how this works.
The [plugin documentation](https://github.com/posthtml/posthtml-extend) also contains good examples
of how it works.

The **"Include"** plugin allows you to use code fragments or "partials" in your HTML code.
Partials live in the `src/partials/` directory.

You can include a partial (for eg. `src/partial/header.html`) with:

    <include src="header.html"></include>

See `src/index.html` and `src/partials/` for more examples on how this works.

### Bootstrap 4
Documentation: http://getbootstrap.com

Feel free to use as much or as little of Bootstrap as you want.
You can enable/disable any part of Bootstrap from `src/assets/styles/_bootstrap.scss`.
All components are disabled by default. Be aware that some components may be dependent on others.

Bootstrap variable overrides go in `src/assets/styles/_bootstrap-variables.scss`.
Rounded corners, gradients and shadows are all disabled by default.

Grid breakpoints `sm` and `md` are disabled by default, leaving only `xs`, `lg` and `xl`.
Grid gutters are set to 0.

All of these changes make the size of Bootstrap smaller and easier to customise.

## Description of directory structure

    html-starter-project/
    ├── build/           # Compiled files. This folder will be overrwitten each build!
    └── src/             # All source files go here
        ├── assets/      # All assets belong here
        |   ├── fonts/   # webfonts
        |   ├── images/  # images
        |   ├── scripts/ # javascript
        |   ├── styles/  # scss / css
        |   └── vendor/  # vendor packages
        ├── layouts/     # HTML layouts / templates
        └── partials/    # HTML partials

## Drone Deployment
If you have a Drone server, you can setup automatic deployment. Use the following commands to
configure Drone for your setup (replacing strings in square brackets with your config):

    drone secret add --skip-verify --conceal --image drillster/drone-rsync [yourname/yourrepo] DEPLOY_KEY @[/local/path/to/your/deploy/key]
    # eg: drone secret add --skip-verify --conceal --image drillster/drone-rsync thegallagher/myrepo DEPLOY_KEY @/home/david/.ssh/deploy_key
    
    drone secret add --skip-verify [yourname/yourrepo] DEPLOY_HOST [yourhost.com]
    # eg: drone secret add --skip-verify thegallagher/myrepo DEPLOY_HOST 'mysite.com'
    
    drone secret add --skip-verify [yourname/yourrepo] DEPLOY_PATH [/path/on/your/server]
    # eg: drone secret add --skip-verify thegallagher/myrepo DEPLOY_PATH '/var/www/sites/mysite.com'