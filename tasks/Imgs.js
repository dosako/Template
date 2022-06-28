import newer from "gulp-newer";
import webp from "gulp-webp";
import avif from "gulp-avif";
import imagemin from "gulp-imagemin";

const convert = () => {
    if ($.conf.noAvif) {
        let message = "'NoAvif' mode is on, please, make sure to import the right module in app.js";
        $.Alert(message);
    }
    
    return $.gulp.src($.path.imgs.src)
    .pipe($.plumber($.conf.plumber))
    .pipe(newer($.path.imgs.dest))
    .pipe($.gulpif($.conf.isProd, imagemin($.conf.imagemin)))
    .pipe($.gulp.dest($.path.imgs.dest))

    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulpif($.conf.isAvif, $.gulp.src($.path.imgs.src)))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulpif($.conf.isAvif, newer($.path.imgs.dest)))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulpif($.conf.isAvif, avif($.conf.avif)))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulpif($.conf.isAvif, $.gulp.dest($.path.imgs.dest)))))
    
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulp.src($.path.imgs.src))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, (newer($.path.imgs.dest))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, (webp($.conf.webp))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulp.dest($.path.imgs.dest))))
    .pipe($.browserSync.stream())
}

export default convert;