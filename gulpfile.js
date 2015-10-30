'use strict';
var gulp = require( 'gulp' );
var senseGo = require( 'sense-go' );
var path = require( 'path' );

var userConfig = senseGo.loadYml( path.join( __dirname, 'sense-go.yml' ) );

senseGo.init( gulp, userConfig, function () {

} );
