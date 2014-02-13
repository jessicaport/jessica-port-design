module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


    concat: {
    // 2. Configuration for concatinating files goes here.   
        dist: {
            src: [
                'assets/js/libs/*.js', // All JS in the libs folder
                'assets/js/global.js'  // This specific file
            ],
            dest: 'assets/js/build/production.js',
        }
    },

    uglify: {
        build: {
            src: 'assets/js/build/production.js',
            dest: 'assets/js/build/production.min.js'
        }
    },

    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'assets/images/',
                src: ['*.{png,jpg,gif}'],
                dest: 'assets/images/build/'
            }]
        }
    },

    autoprefixer: {
      dist: {
          files: {
              'assets/css/build/jpdesign.css': 'assets/css/jpdesign.css'
          }
      }
    },

    watch: {
        options: {
            livereload: true,
        },      
        scripts: {
            files: ['assets/js/*.js'],
            tasks: ['concat', 'uglify', 'imagemin'],
            options: {
                spawn: false,
            }
        },
        css: {
            files: ['assets/css/scss/*.scss'],
            tasks: ['sass', 'autoprefixer'],
            options: {
                spawn: false,
            }
        }         
    },

    sass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'assets/css/jpdesign.css': 'assets/css/scss/jpdesign.scss'
            }
        } 
    }    

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'watch', 'sass']);

};