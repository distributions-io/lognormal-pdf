/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var	validationData = require( './json/accessor.json' ),
		data = validationData.data,
		expected = validationData.expected,
		mu = validationData.mu,
		sigma = validationData.sigma;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Lognormal probability density function', function test() {
		for ( var i = 0; i < data.length; i++ ) {
			assert.closeTo( pdf( data[ i ], mu, sigma ), expected[ i ] , 1e-14 );
		}
	});

});
