import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";

import gulpSass from "gulp-sass";
import sass1 from "sass";

const sass = gulpSass(sass1);

const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dist: "dist/css"
  }
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace"
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const watch = () => {
  gulp.watch(routes.css.watch, styles);
};

const clean = () => del(["dist/styles.css"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
