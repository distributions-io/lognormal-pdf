/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var	validationData = require( './fixtures/accessor.json' ),
		data = validationData.data,
		expected = validationData.expected,
		mu = validationData.mu,
		sigma = validationData.sigma;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Lognormal pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( mu, sigma);
		expect( pdf ).to.be.a( 'function' );
	});


	it( 'should return a function which evaluates the probability density function', function test() {
		var pdf;
		pdf = partial( mu, sigma);
		for ( var i = 0; i < data.length; i++ ) {
			assert.closeTo( pdf( data[ i ] ), expected[ i ] , 1e-14 );
		}
	});


});
