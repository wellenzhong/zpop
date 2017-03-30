module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            js: {
                basePath: '',
                srcPath: './js/src/',
                deployPath: './js/min/'
            },
            css: {
                basePath: '',
                srcPath: './sass/',
                deployPath: './css/'
            }
        },
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
        sass: {
            server: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.css.srcPath %>',
                    src: ['**/*.scss'],
                    dest: '<%= meta.css.deployPath %>/',
                    ext: '.css'
                }]
            }
        },

        concat: {
            // js: {
            //     files: [{
            //         src: ['<%= meta.js.srcPath %>/a.js','<%= meta.js.srcPath %>/b.js'],
            //         dest: '<%= meta.js.srcPath %>/common.js'
            //     }]
            // },
            css: {
                src: ['<%= meta.css.deployPath %>/style.css'],
                dest: '<%= meta.css.deployPath %>/style.css'
            }
        },
        cssmin: {
            css: {
                src: '<%= meta.css.deployPath %>/style.css',
                dest: '<%= meta.css.deployPath %>/style.min.css'
            }
        },

        autoprefixer: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.css.deployPath %>/dest/',
                    src: ['**/*.css'],
                    dest: '<%= meta.css.deployPath %>/dest/',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            options: {
                banner: '\n'
            },
            bulid: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.js.srcPath %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.js.deployPath %>',
                    ext: '.min.js',
                    extDot: 'first'
                }]
            }
        },
        watch: {
            js: {
                files: [
                    '<%= meta.js.srcPath %>/**/*.js'
                ],
                // tasks: ['concat:js', 'uglify']
                tasks: ['uglify']
            },
            style: {
                files: [
                    '<%= meta.css.srcPath %>/**/*.scss'
                ],
                tasks: ['sass', 'autoprefixer', 'concat:css', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.registerTask('default', ['sass', 'autoprefixer', 'concat', 'cssmin', 'uglify']);

};