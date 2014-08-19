module.exports = function (grunt) {

    var target = grunt.option('target') || 'debug';

    // Configuration Options:
    // LocalExtensionPath: Path used by Qlik Sense Desktop
    // ExtensionName: Name of the extension
    // mangle: set if mangling should be activated 
    // dropConsole: Drop all console.log, console.* code-pieces in the distributed files 
    //              (Should be always true for production mode)
    var config = {
        LocalExtensionPath: "d:/Documents/Qlik/Sense/Extensions",
        ExtensionName: "RangeSlider",
        ExtensionNamespace: "",

        replacementsBuild: grunt.file.readJSON('gruntReplacements_build.json'),
        replacementsRelease: grunt.file.readJSON('gruntReplacements_release.json')
    };

    grunt.initConfig({
        // Delete existing files
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                options: {
                    force: true
                },
                src: ['../dist']
            },
            local: {
                options: {
                    force: true
                },
                src: [config.LocalExtensionPath + '/' + config.ExtensionName + '/']
            }
        },

        // Copy to temporary distribution folder and then to the folder being used by
        // QlikView Sense Desktop
        copy: {
            options: {
                debug: true
            },
            copy_to_dist: {
                expand: true,
                cwd: '../src/',
                src: '**',
                dest: '../dist/'
            },
            copy_to_local: {
                expand: true,
                cwd: '../dist/',
                src: '**',
                dest: config.LocalExtensionPath + '/' + config.ExtensionName + '/'
            },
            copy_meta: {
                expand: true,
                cwd: '../',
                src: ['CHANGES.md', 'LICENSE.md', 'README.md'],
                dest: '../dist/'
            }
        },

        // Uglify and compress files (as defined in global properties)
        uglify: {

            // Just the main file as of now
            mainFile: {
                options: {
                    mangle: true,
                    beautify: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '../dist/rangeslider.js': ['../dist/rangeslider.js'],
                    '../dist/rangeslider-properties.js': ['../dist/rangeslider-properties.js'],
                    '../dist/lib/external/angular-rangeslider/angular.rangeSlider.js': ['../dist/lib/external/angular-rangeslider/angular.rangeSlider.js']

                }
            }
        },
        compress: {
            build: {
                options: {
                    archive: '../build/' + config.ExtensionName + '_latest.zip'
                },
                files: [
                    {expand: true, cwd: '../dist/', src: ['**'], dest: '/'}
                ]
            },
            release: {
                options: {
                    archive: '../build/' + config.ExtensionName + '_' + config.replacementsRelease.version + '.zip'
                },
                files: [
                    {expand: true, cwd: '../dist/', src: ['**'], dest: '/'}
                ]
            },
            releaseLatest: {
                options: {
                    archive: '../build/' + config.ExtensionName + '_latest.zip'
                },
                files: [
                    {expand: true, cwd: '../dist/', src: ['**'], dest: '/'}
                ]
            }
        },

        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            json: config.replacementsBuild
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '../dist/',
                        src: ['**/*.*',['!**/*.png']],
                        dest: '../dist/'}
                ]
            },
            release: {
                options: {
                    patterns: [
                        {
                            json: config.replacementsRelease
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '../dist/',
                        src: ['**/*.*',['!**/*.png']],
                        dest: '../dist/'}
                ]
            }
        },

        cleanempty: {
            options: {
                force: true
            },
            lib: {
                options: {
                    files: false
                },
                src: ['../dist/**/*']
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '../dist/lib/external/angular-rangeslider/',
                src: ['angular.rangeSlider.css'],
                dest: '../dist/lib/external/angular-rangeslider/'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-cleanempty');

    grunt.registerTask('build', [

        'clean:dist',
        'clean:local',

        'copy:copy_meta',
        'copy:copy_to_dist', 

        'replace:build',

        'copy:copy_to_local',

        'compress:build'
    ]);

    grunt.registerTask('release', [

        'clean:dist',
        'clean:local',

        'copy:copy_meta',
        'copy:copy_to_dist',

        'replace:release',
        'uglify:mainFile',
        'cssmin',

        'cleanempty',

        'copy:copy_to_local',
        'compress:release',
        'compress:releaseLatest'
    ]);

};