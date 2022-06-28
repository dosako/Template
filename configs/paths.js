import * as nodePath from 'path';

const pathSrc = "./dev";
const pathDest = "./prod";

const rootName = nodePath.basename(nodePath.resolve());
const fin = './FINAL';

const Css_preproc = "sass";

export default {
    root: pathDest,
    from: pathSrc,
    css_preproc: Css_preproc,
    rootName: rootName,
    fin: fin,

    html: {
        src: pathSrc + "/htmls/*.html",
        watch: pathSrc + "/htmls/**/**/*.html",
        dest: pathDest
    },
    
    style: {
        src_cat: pathSrc + "/styles/",
        get src() {
            return [this.src_cat + "*." + Css_preproc, '!' + this.src_cat + "_*." + Css_preproc]
        },
        watch: pathSrc + "/styles/**/**/**/*." + Css_preproc,
        dest: pathDest + "/css"
    },

    script: {
        src: pathSrc + "/scripts/**/*.js",
        watch: pathSrc + "/scripts/**/*.js",
        dest: pathDest + "/js"
    },

    imgs: {
        src: pathSrc + "/pctrs/**/*.{png,jpg,jpeg,gif,webp,avif}",
        svg_src: pathSrc + "/pctrs/**/*.svg",
        watch: pathSrc + "/pctrs/**/*.{png,jpg,jpeg,gif,webp,avif}",
        dest_cat: "imgs/",
        get dest() {
            return pathDest + "/" + this.dest_cat
        }
    },

    fonts: {
        src_cat: "/fonts/",
        get src() {
            return pathSrc + "/fonts"
        },
        dest: pathDest + "/fonts"
    }, 

    get svgicons() {
        return {
            src: pathSrc + "/svgInSprites/*.svg",
            get watch() {
                return this.src
            },
            dest: this.imgs.dest
        }
    }

    // svgicons: {
    //     src: pathSrc + "/svgInSprites/*.svg",
    //     get watch() {
    //         return this.src
    //     },
    //     dest: pathDest + imgs.dest_cat
    // }
}