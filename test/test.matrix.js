/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	pdf = require( './../lib/matrix.js' ),

	// Error function:
	PDF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix pdf', function tests() {

	var mu = 0,
		sigma = 1,
		out,
		mat,
		d1,
		d2,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i / 5;
		d2[ i ] = PDF( i / 5, mu, sigma );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out = matrix( d2, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			pdf( matrix( [10,10] ), mat, mu, sigma );
		}
	});

	it( 'should evaluate the Lognormal pdf for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = pdf( actual, mat, mu, sigma );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( pdf( out, mat, mu, sigma ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( pdf( out, mat, mu, sigma ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( pdf( out, mat, mu, sigma ).data, expected );
	});

});
