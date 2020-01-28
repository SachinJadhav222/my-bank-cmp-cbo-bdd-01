var gulp = require('gulp');
var reporter = require('gulp-protractor-cucumber-html-report');

var plugins = {
    gulpWebDriver: require('gulp-webdriver'),
    path: require('path'),
    glob: require('glob'),
    fs: require('fs'),
    exec: require('child_process').exec,
    wdio: require('core-cucumber-bdd'),
};


gulp.task('wdio', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});

gulp.task('wdio-ci-docker-colleague', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/ci-cmp-cbo-bdd-test.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});


gulp.task('wdio-colleague', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/ci-colleague.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});
gulp.task('wdio-customer', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/ci-customer.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});
gulp.task('wdio-sanity-sauce', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';
    return gulp.src('tests/conf/ci-sanity-sauce-test.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});
gulp.task('wdio-sanity', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';
    return gulp.src('tests/conf/ci-sanity-test.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});

gulp.task('wdio-sauce', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/sauce.lab.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});

gulp.task('wdio-soa-services', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/ci-soa-services.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});

gulp.task('wdio-cmp-cbo-bdd-test', function () {
    var isWin = /^win/.test(process.platform);
    var cmd = isWin ? 'wdio.cmd' : 'wdio';

    return gulp.src('tests/conf/ci-cmp-cbo-bdd-test.cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', cmd)
        }));
});

var seleniumServer;

gulp.task('selenium', function() {
    var isWin = /^win/.test(process.platform);
    var Chromeexecutable = isWin
        ? 'node_modules/chromedriver/lib/chromedriver/chromedriver.exe'
        : 'node_modules/chromedriver/bin/chromedriver';
    var IEexecutable = isWin
        ? 'BDD/tests/acceptance/wdio/tools/iedriver/lib/iedriver/IEDriverServer.exe'
        : 'node_modules/iedriver/bin/iedriver';
    var command = isWin
        ? 'java -jar node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar -log ../seleniumLog.txt -Dwebdriver.ie.driver=' +
    plugins.path.resolve(__dirname, IEexecutable) +
    ' -Dwebdriver.chrome.driver=' +
    plugins.path.resolve(__dirname, Chromeexecutable)
        : 'java -jar node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar -log ../seleniumLog.txt -Dwebdriver.chrome.driver=' +
    plugins.path.resolve(__dirname, Chromeexecutable);
    seleniumServer = plugins.exec(command, function() {
        seleniumServer = null;
    });
 });

gulp.task('selenium2', function () {

});

gulp.task('cucumbers', ['selenium', 'wdio'], function (cb) {
    if (seleniumServer) {
        process.kill(seleniumServer.pid, 'SIGINT');
    }
    cb();
    process.exit(0);
});

gulp.task('ci-colleague', ['selenium', 'wdio-colleague'], function (cb) {
    if (seleniumServer) {
        process.kill(seleniumServer.pid, 'SIGINT');
    }
    cb();
    process.exit(0);
});

gulp.task('ci-customer', ['selenium', 'wdio-customer'], function (cb) {
    if (seleniumServer) {
        process.kill(seleniumServer.pid, 'SIGINT');
    }
    cb();
    process.exit(0);
});

gulp.task('ci-sanity', ['selenium', 'wdio-sanity'], function (cb) {
     if (seleniumServer) {
         process.kill(seleniumServer.pid, 'SIGINT');
     }
     cb();
     process.exit(0);
});

gulp.task('ci-sanity-sauce', ['selenium2', 'wdio-sanity-sauce'], function (cb) {
   /* if (seleniumServer) {
        process.kill(seleniumServer.pid, 'SIGINT');
    }
    cb();
    process.exit(0);*/
});

gulp.task('ci-cmp-cbo-bdd', ['selenium2', 'wdio-cmp-cbo-bdd-test'], function (cb) {

});

gulp.task('ci-docker-colleague', ['selenium2', 'wdio-ci-docker-colleague'], function (cb) {

});

gulp.task('ci-docker-sauce', ['selenium2', 'wdio-sauce'], function (cb) {

});



var yaml = require('js-yaml');
var fs = require("fs");
var mergedArray = [];


gulp.task('findDuplicates', function (cb) {

    //var gruntFile = require('grunt/lib/grunt/file');


    //Load all the Yaml files available inside pom folder
   // return plugins.glob("tests/locators/colleague/*.yml", function (er, files) {
    return plugins.glob("tests/locators/*.yml", function (er, files) {
        var isUnique = true;

        files.forEach(function (filePath) {
            //if (gruntFile.exists(filePath)) {

            try {

                var objYaml = yaml.load(fs.readFileSync(filePath));


                //console.log(objYaml);
                for (var p in objYaml) {

                    if (mergedArray.indexOf(p) > -1) {
                        isUnique = false;
                        console.log('<<<<<< ' + p + ' is a DUPLICATE ENTRY >>>>>>');
                        isUnique = false;

                    }
                    else {
                        mergedArray.push(p);
                    }
                }

            }
            catch (err) {
                console.log('<<<<<<' + err + '>>>>>>');
            }
            //}
        });

        if (isUnique) {
            console.log('<<<<<<< I am Unique :) >>>>>>>');
        }
        else {
            console.log('<<<<<<< I am NOT Unique :( >>>>>>>');
        }
        //console.log(mergedArray[0]);
        cb();
    })


});


