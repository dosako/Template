import size from 'gulp-size';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import shorthand from 'gulp-shorthand';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import avifCss from 'gulp-avif-css';
import webpCss from 'gulp-webpcss';


const Sass = () => {
    return $.gulp.src($.path.style.src, {sourcemaps: $.conf.isDev})
    .pipe($.plumber($.conf.plumber))

    .pipe(sass())
    .pipe($.replace("@imgs/", "../" + $.path.imgs.dest_cat))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, $.gulpif($.conf.isAvif, avifCss())))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, $.gulpif($.conf.noAvif, webpCss())))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, autoprefixer($.conf.autoprefixer)))
    // .pipe(shorthand())
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, groupCssMediaQueries()))

    .pipe($.gulp.dest($.path.style.dest, {sourcemaps: $.conf.isDev}))
    .pipe($.gulpif($.conf.isProd, size({title: "Css [pre]size = "})))
    .pipe($.gulpif($.conf.isProd, $.gulp.dest($.path.style.dest, {sourcemaps: $.conf.isDev})))
    .pipe($.gulpif($.conf.isProd, csso()))
    .pipe($.gulpif($.conf.isProd, size({title: "Css [post]size = "})))
    .pipe(rename({suffix: ".min"}))

    .pipe($.gulp.dest($.path.style.dest, {sourcemaps: $.conf.isDev}))
    .pipe($.browserSync.stream())
};

export default Sass;