var gulp = require('gulp'),
    browserSync = require('browser-sync');
    // postcss = require('gulp-postcss'),
    // autoprefixer = require('autoprefixer'),
    // fs = require('fs'),
    // cleanCSS = require('gulp-clean-css'),
    // deploy = require('gulp-gh-pages'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    // rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    // stylelint = require('gulp-stylelint'),
    // handlebars = require('handlebars'),
    runSequence = require('run-sequence')
    // reload = browserSync.reload,
    // del = require('del'),
    // vinylPaths = require('vinyl-paths'),
    // colors = require('colors'),
    // download = require('gulp-downloader'),
    // flatten = require('gulp-flatten'),
    // hb = require('gulp-hb');

// require.extensions['.html'] = function (module, filename) {
//     module.exports = handlebars.compile(fs.readFileSync(filename, 'utf8'))
// };


var bases = {
    demos: 'demos/',
    dist: 'dist/',
    scss: 'src/',
    brandings: 'brandings/'
};

var sassOptions = {
    outputStyle: 'expanded'
};

// var postcssPlugins = [
//     autoprefixer({
//         browsers: ['last 2 versions']
//     })
// ];







var displayError = function (error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin.error.bold + ']';
    errorString += ' ' + error.message.replace("\n", ''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if (error.fileName)
        errorString += ' in ' + error.fileName;

    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber.bold;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Basso"
    })(err);
    this.emit('end');
};


// BUILD SUBTASKS
// ---------------

// gulp.task('clean:dist', function () {
//     return gulp.src(bases.dist)
//         .pipe(vinylPaths(del));
// });


gulp.task('styles', function () {
    return gulp.src(['**/*.scss', '*/*.scss', '!node_modules/**'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        // .pipe(postcss(postcssPlugins))
        // .pipe(rename({
        //     dirname: ''
        // }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./'))
});


// gulp.task('styles:flatten', function () {
//     return gulp.src(bases.dist + '**/*.css')
//         .pipe(flatten())
//         .pipe(gulp.dest(bases.dist))
// });


// gulp.task('styles:minimize', function () {
//     return gulp.src(bases.dist + '**/*.css')
//         .pipe(cleanCSS())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest(bases.dist))
// });


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './',
            directory: true
        },
        files: ['**/*.html']
    });
    // files: ['**/*.html', '*/*.css']
});

gulp.task('reload', function(){
    browserSync.reload()
})


// gulp.task('lint', function () {
//     return gulp.src(bases.scss + '**/*.scss')
//         .pipe(stylelint({
//             failAfterError: true,
//             reporters: [
//                 { formatter: 'verbose', console: true }
//             ],
//             debug: true
//         }));
// });


gulp.task('watch', function () {
    gulp.watch('*/*.scss', ['styles']);
    // gulp.watch(bases.brandings + '**/*.scss', ['brandings']);
});

gulp.task('watch-s', function () {
    gulp.watch('6.specificity/*.css', ['reload']);
});


// ------------
// BUILD TASKS
// ------------

gulp.task('default', 
    gulp.series('styles', 'browser-sync', 'watch', 'watch-s', function (done) { done() })
);

// gulp.task('build', function (done) {
//     runSequence('clean:dist', 'brandings', 'styles:flatten', 'styles:minimize', done);
// });
