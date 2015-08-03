//stuff
// grab plugins
var concat = require('broccoli-sourcemap-concat');
var mergeTrees = require('broccoli-merge-trees');
var sass = require('broccoli-sass');
var handlebars = require('broccoli-handlebars-precompiler');

// use funnel on bower components
var bowerStuff = concat('bower_components', {outputFile: 'vendor.js', inputFiles: [
    'jquery/dist/jquery.min.js',
    'handlebars/handlebars.runtime.min.js',
    'underscore/underscore-min.js',
    'backbone/backbone-min.js'
]});

var templatesAndScripts = handlebars('assets', {
  srcDir: 'templates',
  namespace: 'AppTemplates'
});

var appJs = concat(templatesAndScripts, {outputFile: 'app.js', inputFiles: [
    'js/setup.js',
    'templates/**/*.js',
    'js/character.js',
    'js/family.js',
    'js/app.js'
  ]});

// compile sass
var compiledSass = sass(['assets/scss', 'bower_components/reset-css'], 'app.scss', 'app.css');

// bring everything together
module.exports = mergeTrees(['public', appJs, compiledSass, bowerStuff]);

