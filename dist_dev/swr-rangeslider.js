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
			snapshot: {
				// Doesn't make sense to enable the slider in StoryTelling-mode, so disable it
				canTakeSnapshot: false
			},
			controller: ['$scope', function ( $scope ) {

				var app = qlik.currApp();

				$scope.sliderOrientation = 'horizontal';
				console.log( 'sliderStep', $scope.layout.props.sliderStep );
				$scope.sliderStep = $scope.layout.props.sliderStep || 1;
				$scope.rangeMin = $scope.layout.props.rangeMin || 0;
				$scope.rangeMax = $scope.layout.props.rangeMax || 100;
				$scope.min = $scope.rangeMin;
				$scope.max = $scope.rangeMax;
				$scope.disabled = false;

				$scope.$watch( 'layout.props.enabled', function ( val, oldVal ) {
					if ( val !== oldVal ) {
						$scope.disabled = !val;
					}
				} );

				$scope.$watch( 'layout.props.sliderStep', function ( val ) {
					$scope.sliderStep = val || 1;
				} );

				$scope.$watch( 'layout.props.rangeMin', function ( val ) {
					$scope.rangeMin = val || 1;
				} );

				$scope.$watch( 'layout.props.rangeMax', function ( val ) {
					$scope.rangeMax = val || 100;
				} );

				$scope.$watch( 'min', function ( val, oldVal ) {

					if ( parseFloat( val ) !== parseFloat( oldVal ) ) {
						app.variable.setContent( '' + $scope.layout.props.varMin + '', '' + val + '' )
							.then( function ( data ) {
								console.log( 'data', data );
								// Due to a bug in 0.96 the promise doesn't return always a value ...
								//console.log('ok');
								angular.noop();
							}, function ( err ) {
								if ( err ) {
									log( 'error', err );
								}
								// never called
								//console.log('error');
								{
									angular.noop();
								}
							} );
					}
				} );
				$scope.$watch( 'max', function ( val, oldVal ) {
					if ( parseFloat( val ) !== parseFloat( oldVal ) ) {
						var maxVar = $scope.layout.props.varMax;
						//console.log('set max variable (' + maxVar + ') ' + val + ' (old: ' + oldVal + ')');
						var app = qlik.currApp();
						app.variable.setContent( '' + maxVar + '', '' + val + '' );
					}
				} );

			}]
		};

	} );