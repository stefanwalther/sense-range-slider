define( [
		'jquery',
		'underscore',
		'angular',
		'qvangular',
		'qlik',
		'./properties',
		'./initialproperties',
		'text!./swr-slider.ng.html',

		// No return values
		'./lib/external/angular-rangeslider/angular.rangeSlider'
	],
	function ( $, _, angular, qvangular, qlik, props, initprops, ngTemplate ) {
		'use strict';

		return {

			definition: props,
			initialProperties: initprops,
			template: ngTemplate,
			snapshot: {canTakeSnapshot: false},
			controller: ['$scope', '$element', '$timeout', function ( $scope, $element, $timeout ) {

				var opts = $scope.sliderOpts = {
					orientation: 'horizontal',
					step: 1,
					rangeMin: 0,
					rangeMax: 100,
					modelMin: 0,
					modelMax: 100,
					disabled: false,
					minVar: null,
					maxVar: null,
					preventEqualMinMax: true,
					pinHandle: '',
					moveValuesWithHandles: false,
					showValues: true
				};

				opts.step = $scope.layout.props.step;
				opts.rangeMin = $scope.layout.props.rangeMin;
				opts.rangeMax = $scope.layout.props.rangeMax;
				opts.orientation = $scope.layout.props.orientation;
				opts.showValues = $scope.layout.props.showValues;

				$scope.$watchCollection( 'layout.props', function ( newVals, oldVals ) {
					Object.keys( newVals ).forEach( function ( key ) {
						if ( newVals[key] !== oldVals[key] ) {
							console.log( 'Changing ' + key + ' to ' + newVals[key] );
							opts[key] = newVals[key];
						}
					} );
				} );

				$scope.$watch( 'sliderOpts.modelMin', function ( newVal, oldVal ) {
					if ( parseFloat( newVal ) !== parseFloat( oldVal ) ) {
						getApp().variable.setContent( '' + getMinVar() + '', newVal );
					}
				} );

				$scope.$watch( 'sliderOpts.modelMax', function ( newVal, oldVal ) {
					if ( parseFloat( newVal ) !== parseFloat( oldVal ) ) {
						console.log('set model max', newVal);
						getApp().variable.setContent( '' + getMaxVar() + '', newVal );
					}
				} );

				function getApp () {
					return qlik.currApp();
				}

				function isNumber ( n ) {
					return !isNaN( parseFloat( n ) ) && isFinite( n );
				}

				/**
				 * Returns the name of the minVar
				 * @returns {exports.props.varMin|{name, value}|*}
				 */
				function getMinVar () {
					return $scope.layout.props.varMin.name;
				}

				/**
				 * Returns the name of the maxVar.
				 * @returns {exports.props.varMax|{name, value}|*}
				 */
				function getMaxVar () {
					return $scope.layout.props.varMax.name;
				}



				function loadVal ( varName, target ) {
					//if ( varName ) {
					//	getApp().variable.getContent( varName )
					//		.then( function ( data ) {
					//			if ( data && data.qContent && data.qContent.qIsNum ) {
					//				console.info( 'LoadVal: Setting value of variable ' + varName + ' to ' + data.qContent.qString );
					//				$scope.sliderOpts[target] = data.qContent.qString;
					//			}
					//		}, function ( err ) {
					//			window.console.error( err ); //Todo: Think of error handling and how to expose to the UI
					//		} )
					//}
				}

				$scope.setVals = function() {
					$scope.sliderOpts.modelMin = isNumber($scope.layout.props.varMin.value) ? $scope.layout.props.varMin.value : 0;
					$scope.sliderOpts.modelMax = isNumber($scope.layout.props.varMax.value) ? $scope.layout.props.varMax.value : 100;
				};

				/**
				 * Several fixes to allow bind the height of the range-slider to its container.
				 * @param $elem
				 */
				$scope.resizeObj = function ( $elem ) {
					if ( $elem && $elem.length ) {
						var $target = $elem.find( '.ngrs-runner' );
						if ( $scope.layout.props.orientation.indexOf( 'vertical' ) > -1 ) {
							console.log( 'change height' );
							$target.height( $elem.parent().height() - 50 );
						} else {
							$target.height( '' );
						}
					}
				};

				$scope.init = function () {

					//$timeout( function (  ) {
					//	loadVal( getMinVar(), 'min' );
					//	loadVal( getMaxVar(), 'max' );
					//});
					$scope.resizeObj( $element );

				};
				$scope.init();

			}],
			paint: function ( $element, layout ) {
				console.log('init: min', layout.props.varMin.value);
				console.log('init: max', layout.props.varMax.value);
				this.$scope.setVals();
				this.$scope.init();
			},
			resize: function ( $element ) {
				this.$scope.resizeObj( $element );
			}
		};
	} );