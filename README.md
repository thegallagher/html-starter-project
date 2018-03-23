# HTML starter project

## Getting started

If you don't have [yarn](https://yarnpkg.com/en/docs/install) or [git](https://git-scm.com/downloads)
installed, you'll need to install them before continuing.

You'll just need to clone this repository. If you are starting a new project, use

    git clone https://github.com/thegallagher/html-starter-project.git
    
Finally, change to the project directory, install the required packages and build the project

    yarn install && yarn run encore dev

## Included packages

### Webpack Encore

Documentation: https://symfony.com/doc/master/frontend.html

Webpack Encore is a simpler way to integrate Webpack into your application.
It wraps Webpack, giving you a clean & powerful API for bundling JavaScript modules,
pre-processing CSS & JS and compiling and minifying assets.

To build assets, run:

    yarn run encore dev


### PostHTML Extend and Include

Documentation:  
https://github.com/posthtml/posthtml-extend  
https://github.com/posthtml/posthtml-include

These two packages allow some structure and reuse in your HTML code.

Extend allows you to create templates or "layouts" for your HTML.
See `src/layouts/app.html` for an example.

Include allows you to use code fragments or "partials" in your HTML code, similar to Server Side Includes.
See `src/index.html` and `src/partials` for examples on how these work.

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

