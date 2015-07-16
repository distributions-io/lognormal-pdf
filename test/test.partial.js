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

	var mu = 0,
		sigma = 1;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Lognormal pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( mu, sigma);
		expect( pdf ).to.be.a( 'function' );
	});

});
