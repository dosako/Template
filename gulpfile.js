import gulp from "gulp";

import conf from './gulp/configs/plugins_configs.js';
import path from './gulp/configs/paths.js';

import plumber from "gulp-plumber";
import browserSync from "browser-sync";
import replace from "gulp-replace";
import notify from "gulp-notify";
import gulpif from "gulp-if";

const Alert = (message) => {
    return $.gulp.src($.path.root)
    .pipe(
        notify({
            title:"REMINDER",
            message: message
    }));
}

global.$ = {
    gulp: gulp,
    conf: conf,
    path: path,
    plumber: plumber,
    browserSync: browserSync.create(),
    replace: replace,
    gulpif: gulpif,
    Alert: Alert
};

import clear from './gulp/tasks/Clear.js';
import watcher from './gulp/tasks/Watcher.js';
import server from './gulp/tasks/Server.js';
import for_html from './gulp/tasks/Nunjucks.js';
import for_styles from './gulp/tasks/Sass.js';
import for_imgs from './gulp/tasks/Imgs.js';
import for_scripts from './gulp/tasks/Js.js';
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/Fonts.js";
import svgSprite from './gulp/tasks/svgSprite.js';
import zipping from './gulp/tasks/Zip.js';
import gitDeploy from './gulp/tasks/GH_deploy.js';

const fonts = $.gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const build = $.gulp.series (
    clear, 
    fonts,
    $.gulp.parallel(for_html, for_styles, for_imgs, for_scripts, svgSprite)
);

const dev = $.gulp.series (
    build,
    $.gulp.parallel(watcher, server)
);

const preProd = $.gulp.series (
    build,
    server
);

const prod = $.gulp.series (
    build,
    zipping
);

const play = server;

var mode = dev;

export { gitDeploy };

// gitDeploy();

if ($.conf.isPlay) 
    mode = play;

if ($.conf.isPreProd) 
    mode = preProd;

if ($.conf.isProd) 
    mode = prod;

export default mode;