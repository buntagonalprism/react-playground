// A directive which enforces a little more type-safety in EC5 and later compliant javascript
// This includes things like throwing an error on trying to write to a variable that has not 
// been explicitly declared first (preventing accidental globals due to typos) and other helpers
"use strict";

// Require statements
var gulp = require('gulp');             // The main gulp toolkit package
var connect = require('gulp-connect');  // Plugin to run a local development web server for testing
var open = require('gulp-open');        // Plugin to open a URL in a web browser
var browserify = require('browserify'); // Javascript bundler
var reactify = require('reactify');     // React JSX transpiler
var source = require('vinyl-source-stream')     // Use conventional text streams with gulp
var concat = require('gulp-concat');     // Concatenates files
var eslint = require('gulp-eslint');        // Lints JS filex including JSX

// Config object used to keep all gulp-related settings in one place
var config = {
    port: 9005,
    devBaseUrl : 'http://localhost',
    paths: {
        html:   './src/*.html',         // File path to match any html document in the root of the 'src' directory
                                        // This pattern syntax is also referred to as a 'glob' using node-glob package
        js:     './src/**/*.js',        // Glob matchs any .js file under 'src' or any subdirectory - used for monitoring js files
        img:    './src/images/*',       // All files in images folder
        css: [                          // Retrieve css files
            'node_modules/bootstrap/dist/css/bootstrap.min.css',  // Bootstrap files are part of bootstrap node module
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',

        ], 
        mainJs: './src/main.js',        // Javacript entry-point file, also used as starting point for browserify bundling
        dist:   './dist'                // File path to match the 'dist' directory for build process output
    }
}

// Task to start a local development web server hosting the contents of the 'dist' directory
// Gulp tasks are declared with a name which we can call from the command via the gulp command
// line interface - e.g. this function could be run by calling: ~$ gulp connect
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        fallback: 'dist/index.html', // for browserHistory compatability, redirect all other paths to index.html
        port: config.port,
        base: config.devBaseUrl,
       
        // livereload option means that the server can cause the browser page to refresh so that the 
        // page can be automatically reloaded without user intervention
        livereload: true
    });
});

// Task to open a page in a browser using the gulp-open package
// The optional second argument is a list of prerequisite / dependency tasks - tasks which gulp will run before executing 
// this one. So if we execute '~$ gulp open' the 'connect' function will get executed first. Multiple prerequisite
// tasks can be specified in an array, but they will all run in parallel /asychronosly, so if task order is important
// then tasks should instead be chained (i.e. one task depends on another which depends on another)
gulp.task('open', ['connect'], function() {

    // gulp.src finds any files matching the input pattern. In this case we have provided an 
    // exact file path so that should be the only result. Other paths could return multiple files
    gulp.src('dist/index.html')

        // 'pipe' command is a feature of node.js allowing us to chain commands - piping the output from 
        // one into the next. This requires the command in question support 'streams' for read/write
        // Streams are also a feature of node.js to encapsulate a flow of data
        .pipe(open({uri:config.devBaseUrl + ':' + config.port}))
});

// Task to copy html files from /src to /dist and reload the web server browser page 
gulp.task('html', function() {

    // gulp.src produces a readable stream selecting in this case all files of .html type
    gulp.src(config.paths.html)

        // gulp.dest is a writeable stream which allows us to output stream data back to the file system
        .pipe(gulp.dest(config.paths.dist))

        // Use the gulp-connect reload function to reload the browser page with current files
        .pipe(connect.reload());
});

// Task to get javascript files from /src, process and output to /dist
gulp.task('js',function(){
    // Specify the javascript files browserify should operate on 
    browserify(config.paths.mainJs)
        // Transform can be used to apply additional stream manipulations using other plugins
        // In this case we are calling the reactify plugin to transpile .jsx into .js
        .transform(reactify)
        // Perform the file bundling process to combine the output .js files from reactify
        .bundle()
        // Bind browserify errors to print to the console error for easy debugging
        .on('error', console.error.bind(console))
        // Use vinyl-source to provide a file output stream for browserify to write to
        .pipe(source('bundle.js'))
        // Use gulp.dest to specify where to write th bundle.js file - into /dist/scripts
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        // Reload our web server
        .pipe(connect.reload());
});

// Css task
gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))   // Directly concatenate css files
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Tasks to use the gulp file system monitoring command - watch() to monitor a file pattern set of files
// for changes, and when changes occur to execute a set of tasks identified by name
// Note that we are not watching a directory here but an actual file search pattern which is kind of neat
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.img, ['images']);
});

// Get javascript source and pass it to eslint for linting, and return output to console using eslint.format()
// See notes for details on the config json file
gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Copy images from source to distribution folder and reload
gulp.task('images', function() {
    gulp.src(config.paths.img)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    // Favicon is an exception - it will sit in root src folder and end up in root distribution folder
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
})


// The default task is a reserved name - this special task is run by simply calling '~$ gulp' from the command 
// line in the project root directory. Here it doesn't have any function of its own apart from running the dependencies
// although it could have a function just like all the preceeding tasks if we wanted
gulp.task('default', ['html','js', 'css', 'images', 'lint','open', 'watch']);