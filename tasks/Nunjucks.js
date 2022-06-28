import nunjucks from "gulp-nunjucks";
import webpHtml from "gulp-webp-html-nosvg";
import avifWebpHTML from "gulp-avif-webp-html";
import size from "gulp-size";
import htmlmin from "gulp-htmlmin";
import versionNumber from "gulp-version-number";

const njk = () => {
    return $.gulp.src($.path.html.src)
    .pipe($.plumber($.conf.plumber))

    .pipe(nunjucks.compile())
    .pipe($.replace('@imgs/', $.path.imgs.dest_cat))

    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, versionNumber($.conf.versionNumber)))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulpif($.conf.isAvif, avifWebpHTML()))))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, ($.gulpif($.conf.noAvif, webpHtml()))))

    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, size({title: "Html [pre]size = "})))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, htmlmin($.conf.htmlmin)))
    .pipe($.gulpif($.conf.isProd || $.conf.isPreProd, size({title: "Html [post]size = "})))
    
    .pipe($.gulp.dest($.path.html.dest))
    .pipe($.browserSync.stream())
};

export default njk;