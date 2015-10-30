define( [
		'jquery',
		'underscore',
		'angular',
		'qvangular',
		'qlik',
		'./properties',
		'./initialproperties',
		'text!./lib/templ/slider.ng.html',

		// No return values
		'./lib/external/angular-rangeslider/angular.rangeSlider'
	],
	function ( $, _, angular, qvangular, qlik, props, initprops, ngTemplate ) {
		'use strict';

		return {

			definition: props,
			initialProperties: initprops,
			template: ngTemplate,
			snapshot: { canTakeSnapshot: false },
			controller: ['$scope', function ( $scope ) {

				var opts = $scope.sliderOpts = {
					orientation: 'horizontal',
					step: 1,
					rangeMin:0,
					rangeMax: 100,
					min: 0,
					max: 100,
					disabled: false,
					minVar: null,
					maxVar: null
				};

				//Todo: prop for disabled
				//Todo: prop for orientation
				opts.step = $scope.layout.props.sliderStep || 1;
				opts.rangeMin = $scope.layout.props.rangeMin || 0;
				opts.rangeMax = $scope.layout.props.rangeMax || 100;

				$scope.$watch( 'layout.props.enabled', function ( val, oldVal ) {
					if ( val !== oldVal ) {
						opts.disabled = !val;
					}
				} );

				$scope.$watch( 'layout.props.step', function ( val ) {
					opts.step = val || 1;
				} );

				$scope.$watch( 'layout.props.rangeMin', function ( val ) {
					opts.rangeMin = val || 1;
				} );

				$scope.$watch( 'layout.props.rangeMax', function ( val ) {
					opts.rangeMax = val || 100;
				} );

				$scope.$watch( 'sliderOpts.min', function ( val, oldVal ) {

					if ( parseFloat( val ) !== parseFloat( oldVal ) ) {
						getApp().variable.setContent( '' + getMinVar() + '', '' + val + '' )
							.then( function ( data ) {
								angular.noop();
							}, function ( err ) {
								if ( err ) {
									//Todo: Think of error handling
									window.console.log( 'error', err );
								}
							} );
					}
				} );
				$scope.$watch( 'sliderOpts.max', function ( val, oldVal ) {
					if ( parseFloat( val ) !== parseFloat( oldVal ) ) {
						getApp().variable.setContent( '' + getMaxVar() + '', '' + val + '' );
					}
				} );

				function getApp() {
					return qlik.currApp();
				}
				function getMinVar() {
					return $scope.layout.props.varMin;
				}
				function getMaxVar() {
					return $scope.layout.props.varMax;
				}

				$scope.init = function () {




				};
				$scope.init();

			}]
		};

	} );