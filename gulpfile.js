//  呼叫 要用的功能 
var gulp = require('gulp'),
    scss = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    sourcemaps = require('gulp-sourcemaps');
    gulpPlumber = require('gulp-plumber');
    notify = require("gulp-notify");  
    pug = require('gulp-pug');
    browserSync = require('browser-sync').create();

//  任務 watch 負責監看指定目錄的指定檔案類型 
// gulp.task('watch', function () {
//     gulp.watch('stylesheet/scss/*.scss', ['styles']);
// });

//  任務 styles 負責設定 scss 編譯的處理規則(本例為minify css)、瀏覽器前綴要對應到多舊的瀏覽器、產生 sourcemap 
gulp.task('styles', function () {
    gulp.src('stylesheet/scss/*.scss')              // 指定要處理的 Scss 檔案目錄
        .pipe(gulpPlumber())                        // 使用 gulp-plumber 處理例外
    	.pipe(sourcemaps.init())
    	.pipe(autoprefixer({browsers: ['last 2 version', 'safari 7', 'ie 8', 'ie 9', 'ios 6', 'android 4']}))
        .pipe(scss({outputStyle: 'compressed'}))    // 編譯 Scss
        .on('error', function(err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('stylesheet/css/'))         // 指定編譯後的 css 檔案目錄
        .pipe(notify("success"));
});

//  任務 task_pug 編譯 pug 
gulp.task('task_pug', function() {
	console.log(pug);
	return gulp.src('./*.pug')
		.pipe(pug({pretty:true}))                   //格式化
		.pipe(gulp.dest('./'))                      //輸出到文件夾
});

//  即時預覽
gulp.task('browser-sync', function() {
	browserSync.init({
		server: "./"	                                          // 指定服務器指定根目錄  
    })
    
    gulp.watch('stylesheet/scss/*.scss', ['styles']);             //  任務 watch 負責監看指定目錄的指定檔案類型 
	gulp.watch('./*.pug', ['task_pug']);	                      // 監聽pug文件變化 執行 task_pug 方法使用 gulp-pug 編譯 pug
	gulp.watch(['./*.html','stylesheet/css/*.css']).on("change",browserSync.reload);    // 監聽pug文件變化 刷新瀏覽器
});

//  設定 gulp 啟動時執行的任務
gulp.task('default', ['styles', 'task_pug','browser-sync']);