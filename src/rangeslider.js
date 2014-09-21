/*global define,require,window,console,_ */
/*jslint    devel:true,
            white: true
 */
define([
        'jquery',
        'qvangular',
        'angular',
        'qlik',
        './rangeslider-properties',
        'text!./lib/templ/slider.ng.html',

        // No return values
        './lib/external/angular-rangeslider/angular.rangeSlider'
],
function ($, qvangular, angular, qlik, properties, template) {

    'use strict';

    return {

        definition: properties,

        template: template,

        // Initial Properties
        initialProperties: {
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 2,
                    qHeight: 50
                }]
            }
        },

        snapshot: {
            // Doesn't make sense to enable the slider in StoryTelling-mode, so disable it
            canTakeSnapshot: false
        },

        controller: ['$scope', function ($scope) {

            //console.log('$scope', $scope);


            $scope.sliderOrientation = 'horizontal';
            $scope.sliderStep = $scope.layout.settings.sliderStep || 1;
            $scope.rangeMin = $scope.layout.settings.rangeMin || 0;
            $scope.rangeMax = $scope.layout.settings.rangeMax || 100;
            $scope.min = $scope.rangeMin;
            $scope.max = $scope.rangeMax;
            $scope.disabled = false;


            $scope.$watch('layout.settings.enabled', function (val, oldVal) {
                if (val !== oldVal) {
                    $scope.disabled = !val;
                }
            });

            $scope.$watch('layout.settings.sliderStep', function (val) {
                $scope.sliderStep = val;
            });

            $scope.$watch('layout.settings.rangeMin', function (val) {
               $scope.rangeMin = val;
            });

            $scope.$watch('layout.settings.rangeMax', function (val) {
                $scope.rangeMax = val;
            });

            $scope.$watch('min', function (val, oldVal) {

                if (parseFloat(val) !== parseFloat(oldVal)) {
                    //console.log('set min: ', val);
                    var app = qlik.currApp();
                    app.variable.setContent('' + $scope.layout.settings.varMin + '', '' + val + '')
                        .then(function (data) {
                            // Due to a bug in 0.96 the promise doesn't return always a value ...
                            //console.log('ok');
                            angular.noop();
                        }, function (err) {
                            // never called
                            //console.log('error');
                            angular.noop();
                        });
                }
            });
            $scope.$watch('max', function(val, oldVal) {
                if (parseFloat(val) !== parseFloat(oldVal)) {
                    var maxVar = $scope.layout.settings.varMax;
                    //console.log('set max variable (' + maxVar + ') ' + val + ' (old: ' + oldVal + ')');
                    var app = qlik.currApp();
                    app.variable.setContent('' + maxVar + '', '' + val + '');
                }
            });

        }]
    };

});